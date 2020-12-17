const jwt = require('jsonwebtoken');
const db = require('../models');

const checkToken = async (token) => {
    let localID = null;
    try {
        const { id } = this.decode(token);
        localID = id;
    } catch (error) {
        
    }
    const user = await db.Usuario.findOne({
        where: { 
            id: localID,
            // estado: 1 // Adicionar campo estado
        }
    });

    if (user) {
        const token = this.encode(user);
        return {
            token,
            rol: user.rol
        }
    } else {
        return false;
    }
}

module.exports = {
    encode: async (user) => {
        const token = jwt.sign({
            id: user.id,
            name: user.nombre,
            email: user.email, 
            rol: user.rol,
            estado: user.estado
        }, 'config.secret.final', {
            expiresIn: 86400 // en segundos
        });
        return token;
    },
    decode: async (token) => {
        try {
            const { id } = jwt.verify(token, 'config.secret.final');
            const user = db.Usuario.findOne({
                where: { 
                    id: id //,
                    // estado: 1
                }
            });
            if (user) {
                return user;
            } else {
                return false;
            }
        } catch (error) {
            // return false;
            const newToken = await checkToken(token);
        }
    }
}