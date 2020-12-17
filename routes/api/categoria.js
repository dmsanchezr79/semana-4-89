const routerx = require('express-promise-router');
const categoriaController = require('../../controllers/CategoriaController');
const auth = require('../../middlewares/auth.js');
const router = routerx();

// api/categoria/list
router.get('/list', auth.verifyUsuario, categoriaController.list);

// api/categoria/add
router.post('/add', auth.verifyUsuario, categoriaController.add);

// api/categoria/update
router.put('/update', auth.verifyUsuario, categoriaController.update);

// api/categoria/activate
router.put('/activate', auth.verifyUsuario, categoriaController.activate);

// api/categoria/deactivate
router.put('/deactivate', auth.verifyUsuario, categoriaController.deactivate);

module.exports = router;
