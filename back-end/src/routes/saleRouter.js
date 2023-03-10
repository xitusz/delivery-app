const router = require('express').Router();
const saleController = require('../controllers/saleController');
const {
  validPriceAndId,
  validStatus,
  validToken,
} = require('../middlewares/createMiddleware');

router.get('/seller/:id', saleController.readBySellerId);
router.get('/user/:id', saleController.readByUserId);
router.get('/:id', saleController.readById);
router.post('/', validToken, validPriceAndId, saleController.create);
router.put('/status/:id', validStatus, saleController.updateStatus);

module.exports = router;
