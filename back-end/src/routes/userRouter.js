const router = require('express').Router();
const userController = require('../controllers/userController');

router.get('/seller', userController.readSellers);
router.get('/customer', userController.readCustomers);
router.get('/:id', userController.readById);

module.exports = router;
