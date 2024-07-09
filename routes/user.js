const { Router } = require('express');
const { check } = require('express-validator');

const { createUser,
   updateFavorites,
   deleteUser
} = require('../controllers/user');
const { validateFields, validateJWT } = require('../middlewares');
const { validatePassword, emailExist } = require('../helpers');

const router = Router();

router.post('/create', [
   check('firstName', 'El campo es obligatorio').trim().notEmpty(),
   check('firstName', 'El campo es obligatorio, mínimo 3 caracteres').isLength({ min: 3 }),
   validateFields,
   check('email', 'El campo es obligatorio').isEmail(),
   validateFields,
   check('email').custom(emailExist),
   validateFields,
   check('password', 'El password debe contener un mínimo de 6 caracteres, un número, una letra mayúscula y una minúscula')
      .custom(pass => validatePassword(pass)),
   validateFields
], createUser);

router.use(validateJWT);

router.post('/favorites', [
   check('favorites', 'Debe ser un arreglo').isArray(),
   validateFields
], updateFavorites);

router.delete('/delete/:id', [
   check('id', 'No es un ID válido').isMongoId(),
   validateFields
], deleteUser);


module.exports = router;
