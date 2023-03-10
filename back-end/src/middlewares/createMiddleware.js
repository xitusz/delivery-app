const unauthorizedError = require('../error/unauthorized');
const userVdSchema = require('../schemas/createValidationSchema');
const { verifyToken } = require('../utils/jwtConfig');

const validEmail = (req, _res, next) => {
  const { email } = req.body;
  switch (true) {
    case userVdSchema.incorrectFormat(email):
      console.log('Incorrect email format');
      throw unauthorizedError('Incorrect email format');
    default: next();
  }
};

const validPassword = (req, _res, next) => {
  const { password } = req.body;

  switch (true) {
    case userVdSchema.isLengthLessThan(password, 6):
      console.log('Incorrect password format');
      throw unauthorizedError('Incorrect password format');
    default: next();
  }
};

const validName = (req, _res, next) => {
  const { name } = req.body;
  
  switch (true) {
    case userVdSchema.isLengthLessThan(name, 12):
      console.log('Incorrect name format');
      throw unauthorizedError('Incorrect name format');
    default: next();
  }
};

const validToken = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ message: 'Token not found' });
  }

  const token = verifyToken(authorization);

  if (!token) {
    res.status(401).json({ message: 'Expired or invalid token' });
  }

  req.user = token;

  next();
};

const validPriceAndId = (req, _res, next) => {
  const { totalPrice, userId, sellerId } = req.body;
  switch (true) {
    case userVdSchema.isNotNumber([totalPrice, userId, sellerId]):
      console.log('Incorrect format, require number');
      throw unauthorizedError('Require number at totalPrice, userId and sellerId');
    default: next();
  }
};

const validStatus = (req, _res, next) => {
  const { status } = req.body;
  switch (true) {
    case userVdSchema.isNotStatus(status):
      console.log('Incorrect format for status');
      throw unauthorizedError('Require a correct format text for status');
    default: next();
  }
};

module.exports = { validEmail, validPassword, validName, validToken, validPriceAndId, validStatus };
