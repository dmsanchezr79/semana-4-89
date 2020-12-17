const routerx = require('express-promise-router');
const userController = require('../../controllers/UserController');
const auth = require('../../middlewares/auth.js');
const router = routerx();

// api/usuario/
router.get('/list', auth.verifyUsuario, userController.listar);

// api/usuario/register
router.post('/register', auth.verifyUsuario, userController.register);

// api/usuario/login
router.post('/login', userController.login);

// Adicionar método para actualizar

module.exports = router;
