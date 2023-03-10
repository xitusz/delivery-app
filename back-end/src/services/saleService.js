const { Product, Sale, SalesProducts } = require('../database/models');

const readById = async (id) => {
  const sales = await Sale.findByPk(id, {
    include: [
      { model: Product, as: 'products', through: 'SalesProducts' },
    ],
  });
  return sales;
};

const readBySellerId = async (sellerId) => {
  const sales = await Sale.findAll({
    where: { sellerId },
    include: [{ model: Product, as: 'products', through: 'SalesProducts' }],
  });
  return sales;
};

const readByUserId = async (userId) => {
  const sales = await Sale.findAll({
    where: { userId },
    include: [{ model: Product, as: 'products', through: 'SalesProducts' }],
  });
  return sales;
};

const create = async (saleInformation) => {
  const { 
    totalPrice, deliveryAddress, deliveryNumber, userId, sellerId, products } = saleInformation;
  const createdSale = await Sale.create({
    totalPrice, 
    deliveryAddress,
    deliveryNumber,
    saleDate: Date.now(),
    status: 'Pendente',
    userId,
    sellerId, 
  });
  const saleId = createdSale.dataValues.id;
  await Promise.all(products.map(async ({ productId, quantity }) => 
  SalesProducts.create({ quantity, saleId, productId })));
  return saleId;
};

const updateStatus = async (id, status) => {
  const sale = await Sale.findByPk(id);
  const updatedSale = await sale.update({ status });
  return updatedSale;
};

module.exports = {
  readById,
  readBySellerId,
  readByUserId,
  create,
  updateStatus,
};
