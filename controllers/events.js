const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

    try {
        const eventos = await Evento.find();

        return res.status(200).json({
            status: true,
            eventos: eventos
        })
    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: 'Hable con el administrador'
        })
    }

}

const crearEvento = async (req, res = response) => {
    const evento = new Evento(req.body);

    try {
        evento.user = req.uid;
        const eventoGuardado = await evento.save();
        return res.status(200).json({
            status: true,
            evento: eventoGuardado
        })

    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: 'Hable con el administrador'
        })
    }
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