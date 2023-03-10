const router = require('express').Router();
const loginRouter = require('./loginRouter');
const registerRouter = require('./registerRouter');
const productRouter = require('./productRouter');
const imagesRouter = require('./imageRouter');
const saleRouter = require('./saleRouter');
const userRouter = require('./userRouter');

router.use('/login', loginRouter);
router.use('/register', registerRouter);
router.use('/product', productRouter);
router.use('/images', imagesRouter);
router.use('/sale', saleRouter);
router.use('/user', userRouter);

module.exports = router;
