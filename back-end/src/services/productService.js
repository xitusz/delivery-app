const { Product } = require('../database/models');

const read = async () => {
  const products = await Product.findAll();
  return products;
};

module.exports = {
  read,
};
