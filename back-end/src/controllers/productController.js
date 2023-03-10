const productService = require('../services/productService');

const read = async (_req, res, next) => {
  try {
    const products = await productService.read();
    return res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  read,
};
