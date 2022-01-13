const { Router } = require('express');
const router = Router();
const { validarJWT } = require('../middlewares/validar-jwt');
const { getEventos, crearEvento, actualizarEvento, eliminarEvento } = require('../controllers/events');
const { check } = require('express-validator');
const { validar_campos } = require('../middlewares/validar-campos');
const { isDate } = require('../helpers/isDate');

//Todas tienen que pasar por la validacion del jwt
router.use(validarJWT);

//Obtener eventos
router.get('/', getEventos)

//Crear un nuevo evento
router.post('/create', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validar_campos,

], crearEvento);

//Actualizar un evento
router.put('/update/:id', [
    check('title', 'El titulo es obligatorio').not().isEmpty(),
    check('start', 'Fecha de inicio es obligatoria').custom(isDate),
    check('end', 'Fecha de finalizacion es obligatoria').custom(isDate),
    validar_campos], actualizarEvento);

//Borrar un evento
router.delete('/delete/:id', eliminarEvento);

module.exports = router;