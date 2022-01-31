const { response } = require('express');
const bcrypt = require('bcryptjs');
const Usuario = require('../models/Usuario');
const { generarJWT } = require('../helpers/jwt');

const registro_usuario = async (req, res = response) => {
    const { mail, password } = req.body;

    try {
        let usuario = await Usuario.findOne({ mail: mail });

        if (usuario) {
            return res.status(400).json({
                status: false,
                msg: 'Un usuario existe con ese correo'
            })
        }

        usuario = new Usuario(req.body);

        //Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);
        await usuario.save();

        //Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);
        return res.status(201).json({
            status: true,
            uid: usuario.id,
            name: usuario.name,
            token
        })
    } catch (error) {
        return res.status(500).json({ status: false, msg: 'Por favor, comuniquese con el administrador de la app.' });
    }
};

const login_usuario = async (req, res = response) => {
    const { mail, password } = req.body;

    try {
        const usuario = await Usuario.findOne({ mail: mail });

        if (!usuario) {
            return res.status(400).json({ status: false, msg: 'Usuario no existe' })
        }

        //Confirmar password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                status: false, msg: 'Contrasena Incorrecta'
            });
        }

        //Generar nuestro JWT
        const token = await generarJWT(usuario.id, usuario.name);

        return res.status(200).json({
            status: true,
            uid: usuario.id,
            name: usuario.name,
            token
        });

    } catch (error) {
        return res.status(500).json({ status: false, msg: 'Por favor, comuniquese con el administrador de la app.' });
    }


};

const renew_token = async (req, res = response) => {
    const { uid, name } = req;
    console.log(req);

    const token = await generarJWT(uid, name);

    res.status(200).json({
        status: true,
        uid,
        name,
        token,
    })
};


module.exports = {
    registro_usuario,
    login_usuario,
    renew_token,
}