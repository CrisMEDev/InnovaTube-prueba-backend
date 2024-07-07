const { request, response } = require('express');
const jwt = require('jsonwebtoken');

const { InnovaUser } = require('../models/index');

const validateJWT = async (req = request, res = response, next) => {

   const token = req.header('x-token');

   if (!token) {
      return res.status(401).json({
         msg: 'No se ha detectado un token en la petición'
      });
   }

   try {

      // Verifica si es un JWT válido y si es así se extrae el uid del user que hizo la petición
      const { uid } = jwt.verify(token, process.env.SECRET_OR_PRIVATE_KEY);

      // Leer el usuario del modelo
      const innovaUser = await InnovaUser.findById(uid);

      if (!innovaUser) {
         return res.status(401).json({
            msg: 'Token no valido - el usuario no existe en BD'
         });
      }

      // Verificar si el uid tiene estado true
      if (!innovaUser.status) {
         return res.status(401).json({
            msg: 'Token no valido - colaborador no encontrado'
         });
      }

      // Se coloca el usuario en la request, como pasa por referencia ahora los otros
      // validators, middlewares o controllers tendran acceso
      req.logged_user = innovaUser;

      next();
   } catch (error) {
      console.log(error);
      return res.status(401).json({
         msg: 'Token no válido'
      });
   }

}

module.exports = {
   validateJWT
}