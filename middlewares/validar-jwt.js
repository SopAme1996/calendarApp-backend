const { response } = require("express");
const jwt = require('jsonwebtoken');

const validarJWT = (req, res = response, next) => {

    //x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            status: false,
            msg: 'No hay token en la peticion'
        });
    }

    try {
        const payload = jwt.verify(token, process.env.SECRET_JWT_SEED);
        req.body = payload;
    } catch (error) {
        return res.status(401).json({ status: false, msg: 'Token no valido' });
    }
    next();
}

module.exports = {
    validarJWT
}