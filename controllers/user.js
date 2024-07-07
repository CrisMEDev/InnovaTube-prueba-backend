const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const { InnovaUser } = require('../models');

const createUser = async(req = request, res = response) => {

   const { status: estado, password, ...data } = req.body;
   
   try {
      
      const innovaUserDB = new InnovaUser({ ...data });

      // Encriptar contraseña
      const salt = bcryptjs.genSaltSync();
      innovaUserDB.password = bcryptjs.hashSync(password, salt);

      await innovaUserDB.save();

      res.status(200).json({
         ok: true,
         user: innovaUserDB,
         msg: 'Usuario creado exitosamente'
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Algo salió mal, contacte a su administrador'
      });
   }
}

const deleteUser = async(req = request, res = response) => {

   const { id } = req.params;
   
   try {

      const innovaUserDB = await InnovaUser.findByIdAndUpdate( id, { status: false } );

      res.status(200).json({
         ok: true,
         user: innovaUserDB,
         msg: 'Rol borrado correctamente'
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Algo salió mal, contacte a su administrador'
      });
   }
}

module.exports = {
   createUser,
   deleteUser
}
