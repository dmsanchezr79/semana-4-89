// CategoriaController
const db = require('../models');

module.exports = {
    list: async (req, res, next) => { 
        try {
            const user = await db.Categoria.findAll({
                // where: {
                //     estado: 1
                // }
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send({
                message: 'Error al listar categorias: ' + error
            });
            next(error);
        }
    },
    add: async (req, res, next) => {
        try {
            req.body.estado = 1;
            const categoriaNew = await db.Categoria.create(req.body);
            res.status(200).json(categoriaNew);
        } catch (error) {
            res.status(500).send({
                message: 'Error al registrar categoria: ' + error
            });
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const categoriaNew = await db.Categoria.findOne({
                where: {
                    id: req.body.id
                }
            });

            if (categoriaNew) {
                // Actualizar campos
                categoriaNew.nombre = req.body.nombre;
                categoriaNew.descripcion = req.body.descripcion;
                categoriaNew.codigo = req.body.codigo;
                await categoriaNew.save();
                res.status(200).json(categoriaNew);
            } else {
                res.status(404).send('Category not found'); 
            }
        } catch (error) {
            res.status(500).send({
                message: 'Error al actualizar categoria: ' + error
            });
            next(error);
        }
    },
    activate: async (req, res, next) => {
        try {
            const categoriaNew = await db.Categoria.findOne({
                where: {
                    id: req.body.id
                }
            });

            if (categoriaNew) {
                // Actualizar campos
                categoriaNew.estado = 1;
                await categoriaNew.save();
                res.status(200).json(categoriaNew);
            } else {
                res.status(404).send('Category not found'); 
            }
        } catch (error) {
            res.status(500).send({
                message: 'Error al actualizar categoria: ' + error
            });
            next(error);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const categoriaNew = await db.Categoria.findOne({
                where: {
                    id: req.body.id
                }
            });

            if (categoriaNew) {
                // Actualizar campos
                categoriaNew.estado = 0;
                await categoriaNew.save();
                res.status(200).json(categoriaNew);
            } else {
                res.status(404).send('Category not found');
            }
        } catch (error) {
            res.status(500).send({
                message: 'Error al actualizar categoria: ' + error
            });
            next(error);
        }
    },
}
