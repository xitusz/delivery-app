const router = require('express').Router();
const userController = require('../controllers/userController');
const { 
  validEmail, validPassword, validName, validToken, 
} = require('../middlewares/createMiddleware');

router.post(
  '/admin', validToken, validEmail, validPassword, validName, userController.createByAdmin,
);

router.post('/', validEmail, validPassword, validName, userController.create);

module.exports = router;
