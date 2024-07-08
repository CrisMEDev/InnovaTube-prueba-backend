const { request, response } = require('express');
const bcrypt = require('bcryptjs');

const { InnovaUser } = require('../models');
const { generateJWT } = require('../helpers');

const login = async (req = request, res = response) => {

   const { email, password } = req.body;

   try {

      const innovaUserDB = await InnovaUser.findOne({ email });

      if (!innovaUserDB) {
         return res.status(400).json({
            ok: false,
            msg: 'El usuario/contraseña no son correctos'
         });
      }

      if (!innovaUserDB.status) {
         return res.status(400).json({
            ok: false,
            msg: 'El usuario/contraseña no son correctos'
         });
      }

      // Verificar la contraseña
      const validPassword = bcrypt.compareSync(password, innovaUserDB.password);
      if (!validPassword) {
         return res.status(400).json({
            msg: 'El usuario / contraseña no son correctos'
         });
      }

      const token = await generateJWT(innovaUserDB.id);

      res.status(200).json({
         ok: true,
         user: innovaUserDB,
         token,
         msg: 'Sesión iniciada correctamente'
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Algo salió mal, contacte a su administrador'
      });
   }
}

const changePassword = async (req = request, res = response) => {

   const { id } = req.params;
   const { password } = req.body;

   try {

      const innovaUserDB = await InnovaUser.findById(id);

      // Se verifica que el password no sea el mismo que el anterior
      const isSamePassword = bcrypt.compareSync(password, innovaUserDB.password);
      if (isSamePassword) {
         return res.status(400).json({
            ok: false,
            msg: 'La contraseña debe ser diferente a la anterior'
         });
      }

      // Encriptar nuevo password
      let salt = bcrypt.genSaltSync();
      const newPasswordHashed = bcrypt.hashSync(password, salt);
      innovaUserDB.password = newPasswordHashed;

      await innovaUserDB.save();

      res.status(200).json({
         ok: true,
         msg: 'Contraseña cambiada correctamente'
      });

   } catch (error) {
      console.log(error);
      return res.status(500).json({
         msg: 'Algo salió mal, contacte a su administrador'
      });
   }
}

const renewToken = async (req = request, res = response) => {

   const user = req.logged_user; // Se extrae usuario del token

   try {

      // Generar JWT nuevamente
      const token = await generateJWT(user._id);

      res.status(201).json({
         ok: true,
         user,
         token
      });

   } catch (error) {
      console.log(error);
      res.status(500).json({
         msg: 'Algo salió mal, contacte a su administrador'
      });
   }

}

module.exports = {
   changePassword,
   login,
   renewToken,
}
