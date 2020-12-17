// UserController
const db = require('../models');
const bcrypt = require('bcryptjs');
const tokenService = require('../services/token');

module.exports = {
    login: async (req, res, next) => {
        try {
            const user = await db.Usuario.findOne({
                where: {
                    email: req.body.email
                }
            });
    
            if (user) {
                const passwordValid = bcrypt.compareSync(req.body.password, user.password);
                if (passwordValid) {
                    const token = await tokenService.encode(user);
                    res.status(200).send({
                        user: user,
                        tokenReturn: token
                    });
                } else {
                    res.status(401).send({ auth: false, accessToken: null, reason: "Invalid Password!" }); //.json({ error: 'Error en usuario o contraseña' });
                }
            } else {
                res.status(404).send('User not found'); //.json({ error: 'Error en usuario o contraseña' });
            }
        } catch (error) {
            res.status(500).send({
                message: 'Error en login: ' + error
            });
            next(error);
        }
    },

    register: async (req, res, next) => {
        try {
            req.body.password = bcrypt.hashSync(req.body.password, 8);
            const user = await db.Usuario.create(req.body);
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send({
                message: 'Error al registrar usuario: ' + error
            });
            next(error);
        }
    },
    
    listar: async (req, res, next) => {
        try {
            const user = await db.Usuario.findAll();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send({
                message: 'Error al listar usuarios: ' + error
            });
            next(error);
        }
    },

}