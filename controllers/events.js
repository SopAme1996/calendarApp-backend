const { response } = require('express');
const Evento = require('../models/Evento');


const getEventos = async (req, res = response) => {

    try {
        const eventos = await Evento.find().populate('user', 'name');

        return res.status(200).json({
            status: true,
            eventos
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
    const eventoId = req.params.id;
    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                status: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                status: false,
                msg: 'No tiene privilegio de editar este evento'
            });
        }

        const nuevoEvento = {
            ...req.body,
            user: req.uid,
        };

        const eventoUpdate = await Evento.findByIdAndUpdate(eventoId, nuevoEvento, { new: true });

        return res.status(200).json({
            status: true,
            eventoUpdate
        });

    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: 'Hable con el administrador'
        });
    }
}

const eliminarEvento = async (req, res = response) => {
    const eventoId = req.params.id;
    try {
        const evento = await Evento.findById(eventoId);

        if (!evento) {
            return res.status(404).json({
                status: false,
                msg: 'Evento no existe con ese id'
            });
        }

        if (evento.user.toString() !== req.uid) {
            return res.status(401).json({
                status: false,
                msg: 'No tiene privilegio para eliminar este evento'
            });
        }

        const eventoDelete = await Evento.findByIdAndDelete(eventoId);

        return res.status(200).json({
            status: true,
            eventoDelete
        });


    } catch (error) {
        return res.status(500).json({
            status: false,
            msg: 'Hable con el administrador'
        });
    }
}

module.exports = {
    getEventos,
    crearEvento,
    actualizarEvento,
    eliminarEvento,
}