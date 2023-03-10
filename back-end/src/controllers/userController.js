const userService = require('../services/userServices');

const create = async (req, res, next) => {
  const { name, email, password } = req.body;
  try {
    const message = await userService.create(name, email, password);
    return res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const data = await userService.login(email, password);
    return res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

const createByAdmin = async (req, res, next) => {
  const { body: { name, email, password, role }, headers: { authorization } } = req;
  const userToCreate = { name, email, password, role };
  try {
    const message = await userService.createByAdmin(userToCreate, authorization);
    return res.status(201).json({ message });
  } catch (err) {
    next(err);
  }
};

const readById = async (req, res, next) => {
  const { id } = req.params;
  try {
    const user = await userService.readById(id);
    return res.status(200).json(user);
  } catch (err) {
    next(err);
  }
};

const readSellers = async (req, res, next) => {
  try {
    const sellers = await userService.readSellers();
    return res.status(200).json(sellers);
  } catch (err) {
    next(err);
  }
};

const readCustomers = async (req, res, next) => {
  try {
    const customers = await userService.readCustomers();
    return res.status(200).json(customers);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  create,
  login,
  createByAdmin,
  readById,
  readSellers,
  readCustomers,
};
