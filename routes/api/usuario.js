const routerx = require('express-promise-router');
const userController = require('../../controllers/UserController');
const auth = require('../../middlewares/auth.js');
const router = routerx();

// api/usuario/
router.get('/list', auth.verifyUsuario, userController.listar);

// api/usuario/add
router.post('/add', auth.verifyUsuario, userController.register);

// api/usuario/login
router.post('/login', userController.login);

// api/usuario/update
router.put('/update', auth.verifyUsuario, userController.update);

// api/usuario/activate
router.put('/activate', auth.verifyUsuario, userController.activate);

// api/usuario/deactivate
router.put('/deactivate', auth.verifyUsuario, userController.deactivate);

module.exports = router;
