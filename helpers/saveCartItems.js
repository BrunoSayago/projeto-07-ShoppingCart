const saveCartItems = (lista) => {
  // seu código aqui
  localStorage.setItem('cartItems', lista);
};

if (typeof module !== 'undefined') {
  module.exports = saveCartItems;
}
