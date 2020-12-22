// ArticuloController
const db = require('../models');

module.exports = {
    list: async (req, res, next) => { 
        try {
            const user = await db.Articulo.findAll({
                // where: {
                //     estado: 1
                // },
                include: 'categoria'
            });
            res.status(200).json(user);
        } catch (error) {
            res.status(500).send({
                message: 'Error al listar articulos: ' + error
            });
            next(error);
        }
    },
    add: async (req, res, next) => {
        try {
            req.body.estado = 1;
            const articuloNew = await db.Articulo.create(req.body);
            res.status(200).json(articuloNew);
        } catch (error) {
            res.status(500).send({
                message: 'Error al registrar articulo: ' + error
            });
            next(error);
        }
    },
    update: async (req, res, next) => {
        try {
            const articuloNew = await db.Articulo.findOne({
                where: {
                    id: req.body.id
                }
            });

            if (articuloNew) {
                // Actualizar campos
                articuloNew.nombre = req.body.nombre;
                articuloNew.descripcion = req.body.descripcion;
                articuloNew.codigo = req.body.codigo;
                articuloNew.categoriaId = req.body.categoriaId;
                await articuloNew.save();
                res.status(200).json(articuloNew);
            } else {
                res.status(404).send('Articulo not found'); 
            }
        } catch (error) {
            res.status(500).send({
                message: 'Error al actualizar articulo: ' + error
            });
            next(error);
        }
    },
    activate: async (req, res, next) => {
        try {
            const articuloNew = await db.Articulo.findOne({
                where: {
                    id: req.body.id
                }
            });

            if (articuloNew) {
                // Actualizar campos
                articuloNew.estado = 1;
                await articuloNew.save();
                res.status(200).json(articuloNew);
            } else {
                res.status(404).send('Articulo not found'); 
            }
        } catch (error) {
            res.status(500).send({
                message: 'Error al actualizar articulo: ' + error
            });
            next(error);
        }
    },
    deactivate: async (req, res, next) => {
        try {
            const articuloNew = await db.Articulo.findOne({
                where: {
                    id: req.body.id
                }
            });

            if (articuloNew) {
                // Actualizar campos
                articuloNew.estado = 0;
                await articuloNew.save();
                res.status(200).json(articuloNew);
            } else {
                res.status(404).send('Articulo not found'); 
            }
        } catch (error) {
            res.status(500).send({
                message: 'Error al actualizar articulo: ' + error
            });
            next(error);
        }
    },
}
