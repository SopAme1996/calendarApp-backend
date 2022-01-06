/*
Rutas del usuario / Auth
host + /api/auth
*/
const { Router } = require('express');
const router = Router();
const { check } = require('express-validator');
const { registro_usuario, renew_token, login_usuario } = require('../controllers/auth')
const { validar_campos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.post('/register',
    [
        //Middleware
        //Validation Name
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        //Validation mail
        check('mail', 'El mail es obligatorio').not().isEmpty(),
        check('mail', 'No cumple con el formato de un email').isEmail(),
        //Validation password
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('password', 'La contraseña tiene que ser mayor a 12').isLength({ min: 12 }),
        //CustomMiddleware para verificar errores
        validar_campos
    ],
    registro_usuario);
router.post('/login', [
    //Validation mail
    check('mail', 'El mail es obligatorio').not().isEmpty(),
    check('mail', 'No cumple con el formato de un email').isEmail(),
    //Validation password
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    check('password', 'La contraseña tiene que ser mayor a 12').isLength({ min: 12 }),
    //CustomMiddleware para verificar errores
    validar_campos
], login_usuario);
router.get('/renew', validarJWT, renew_token);


module.exports = router;