const routerx = require('express-promise-router');
const articuloRouter = require('./api/articulo');
const userRouter = require('./api/usuario');
const categoriaRouter = require('./api/categoria');

const router = routerx();

router.use('/articulo', articuloRouter);
router.use('/categoria', categoriaRouter); 
router.use('/usuario', userRouter); 

module.exports = router;
