const fetchProducts = async (string) => {
  if (!string) {
    throw new Error('You must provide an url');
  }

  const url = 'https://api.mercadolibre.com/sites/MLB/search?q=$QUERY';
  const urlActual = url.replace('$QUERY', string);

  const result = await fetch(urlActual)
    .then((response) => response.json());
  
  return result;
};

if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}
