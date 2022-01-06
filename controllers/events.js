const { response } = require('express');
const Evento = require('../models/Evento');

const getEventos = async (req, res = response) => {
    return res.status(200).json({
        status: true,
        msg: 'getEventos'
    })
}

const crearEvento = async (req, res = response) => {

    //Verificar que tenga el evento
    console.log(req.body);

    return res.status(200).json({
        status: true,
        msg: 'crearEventos'
    })
}

const actualizarEvento = async (req, res = response) => {
    return res.status(200).json({
        status: true,
        msg: 'actualizarEvento'
    })
}

const eliminarEvento = async (req, res = response) => {
    return res.status(200).json({
        status: true,
        msg: 'eliminar Evento',
    })
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}