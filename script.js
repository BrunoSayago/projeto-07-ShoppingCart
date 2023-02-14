const createProductImageElement = (imageSource) => {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
};

const botaoApagar = document.getElementsByClassName('empty-cart')[0];

const createTotal = async (listaCompleta) => {
  const itens = listaCompleta.children;
  let total = 0;
  if (itens.length !== 0) {
    for (let index = 0; index < itens.length; index += 1) {
    const texto = itens[index].innerText;
    const dividida = texto.split('|');
    const index$ = dividida[2].indexOf('$');
    const numero = parseFloat(dividida[2].slice(index$ + 1));
    total += numero;
    }
  }
  const lugarTotal = document.getElementsByClassName('total-price')[0];
  lugarTotal.innerText = `${Math.round((total * 100)) / 100}`;
};

const apagarCarrinho = () => {
  const ol = document.getElementsByClassName('cart__items')[0];
  ol.innerHTML = '';
  createTotal(ol);
  saveCartItems(ol.innerHTML);
};

botaoApagar.addEventListener('click', apagarCarrinho);

const createCustomElement = (element, className, innerText) => {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
};

const createProductItemElement = ({ sku, name, image }) => {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));

  return section;
};

const getSkuFromProductItem = (item) => item.querySelector('span.item__sku').innerText;

const cartItemClickListener = (event) => {
  const item = event.target;
  const pai = document.getElementsByClassName('cart__items')[0];
  pai.removeChild(item);
  saveCartItems(pai.innerHTML);
  createTotal(pai);
};

const createCartItemElement = ({ sku, name, salePrice }) => {
  const li = document.createElement('li');
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  li.addEventListener('click', cartItemClickListener);
  return li;
};

const dadosProduto = async (id) => {
  const dados = await fetchItem(id);
  
  const newObj = {
    sku: dados.id,
    name: dados.title,
    salePrice: dados.price,
  };
  
  const carrinhoItens = document.getElementsByClassName('cart__items')[0];
  const newSec = createCartItemElement(newObj);
  carrinhoItens.appendChild(newSec);
  saveCartItems(carrinhoItens.innerHTML);
  createTotal(carrinhoItens);
  newSec.addEventListener('click', cartItemClickListener);
};

const adicionaCarregando = () => {
  const carregando = createCustomElement('span', 'loading', 'Carregando...');
  const container = document.getElementsByClassName('container')[0];
  container.appendChild(carregando);
};

const tiraCarregando = () => {
  const achaCarregando = document.getElementsByClassName('loading')[0];
  achaCarregando.remove();
};

const clicaBotao = (evento) => {
  const botaoClicado = evento.target;
  const paiBotao = botaoClicado.parentElement;
  const skuSelec = paiBotao.firstChild.innerText;
  dadosProduto(skuSelec);
};

const criaListaComputador = async () => {
  const results = await fetchProducts('computador')
    .then((data) => data.results);
  
  tiraCarregando();
  results.forEach((elemento) => {
    const newObj = { 
      sku: elemento.id,
      name: elemento.title,
      image: elemento.thumbnail,
    };
    const listPai = document.getElementsByClassName('items');
    const pai = listPai[0];
    const secaoCriada = createProductItemElement(newObj);
    pai.appendChild(secaoCriada);
    const botaoSecaoCriada = secaoCriada.lastChild;
    botaoSecaoCriada.addEventListener('click', clicaBotao);
  });
};

// Posição 1

adicionaCarregando();

window.onload = () => {
  criaListaComputador();
  // tiraCarregando();
  const listaAtual = getSavedCartItems();
  if (listaAtual !== null) {
    const ol = document.getElementsByClassName('cart__items')[0];
    ol.innerHTML = listaAtual;
    console.log(ol.children);
    for (let index = 0; index < ol.children.length; index += 1) {
      ol.children[index].addEventListener('click', cartItemClickListener);
    }
    createTotal(ol);
  }
  // localStorage.clear();
};
