const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');

//Todas tienen que pasar por la validacion del jwt
router.use(validarJWT);
//Obtener eventos
router.get('/', getEventos)

//Crear un nuevo evento
router.post('/create', crearEvento);

//Actualizar un evento
router.put('/update/:id', actualizarEvento);

//Borrar un evento
router.delete('/delete/:id', eliminarEvento);

module.exports = router;