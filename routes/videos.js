const { Router } = require('express');
const { check } = require('express-validator');

const { getVideosByQuery } = require('../controllers/videos');
const { validateFields, validateJWT } = require('../middlewares');

const router = Router();

router.use(validateJWT);

router.get('/query', [
   check('searchQuery', 'El campo es obligatorio').trim().notEmpty(),
   validateFields
], getVideosByQuery);


module.exports = router;
