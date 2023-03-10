const { sign, verifyToken } = require('../utils/jwtConfig');
const { User } = require('../database/models');
const conflict = require('../error/conflict');
const badRequest = require('../error/badRequest');
const unauthorized = require('../error/unauthorized');
const { hash, verify } = require('../utils/hash');
const { USER_CREATED } = require('../utils/messages');

const create = async (name, email, password) => {
  const hashedPassword = hash(password);

  const existEmail = await User.findOne({ where: { email } });
  
  if (existEmail) throw conflict('User already registered');
  
  await User.create({ name, email, password: hashedPassword, role: 'customer' });
  
  return USER_CREATED;
};

const login = async (email, password) => {
  const user = await User.findOne({ where: { email } });
  
  if (!user) throw badRequest('Invalid fields');

  if (!verify(password, user.password)) throw badRequest('Invalid fields');

  const { dataValues: { id, role } } = user;
  
  const token = sign({ id, role });

  delete user.dataValues.password;

  return {
    ...user.dataValues,
    token,
  };
};

const createByAdmin = async (userToCreate, authorization) => {
  const { name, email, password, role } = userToCreate;
  const hashedPassword = hash(password);
  const token = verifyToken(authorization);

  if (token.role !== 'administrator') throw unauthorized('You dont have administrator role');

  const existEmail = await User.findOne({ where: { email } });

  if (existEmail) throw conflict('User already registered');
  await User.create({ name, email, password: hashedPassword, role });

  return USER_CREATED;
};

const readById = async (id) => {
  const sale = await User.findByPk(id);
  return sale;
};

const readSellers = async () => {
  const sellers = await User.findAll({ where: { role: 'seller' } });
  return sellers;
};

const readCustomers = async () => {
  const sellers = await User.findAll({ where: { role: 'customer' } });
  return sellers;
};

module.exports = {
  create,
  login,
  createByAdmin,
  readById,
  readSellers,
  readCustomers,
};
