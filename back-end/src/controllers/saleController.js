const saleService = require('../services/saleService');

const readById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sales = await saleService.readById(id);
    return res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

const readBySellerId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sales = await saleService.readBySellerId(id);
    return res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

const readByUserId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const sales = await saleService.readByUserId(id);
    return res.status(200).json(sales);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  const saleInformation = req.body;
  try {
    const createdSale = await saleService.create(saleInformation);
    return res.status(201).json(createdSale);
  } catch (err) {
    next(err);
  }
};

const updateStatus = async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const { status } = req.body;
  console.log(status);
  try {
    const updatedSale = await saleService.updateStatus(id, status);
    return res.status(200).json(updatedSale);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  readById,
  readBySellerId,
  readByUserId,
  create,
  updateStatus,
};
