const { Router } = require('express');
const { check } = require('express-validator');

const { login, changePassword, renewToken } = require('../controllers/auth');
const { validateFields, validateJWT } = require('../middlewares');
const { validatePassword } = require('../helpers');

const router = Router();


router.post('/login', [
   check('email', 'El correo es obligatorio').isEmail(),
   check('password', 'La contraseña es obligatoria').trim().notEmpty(),
   validateFields
], login);

router.use(validateJWT);

router.post('/change-pass/:id', [
   check('password', 'El password debe contener un mínimo de 6 caracteres, un número, una letra mayúscula y una minúscula')
      .custom(pass => validatePassword(pass)),
   validateFields
], changePassword);

router.get('/renew', [], renewToken );

module.exports = router;

