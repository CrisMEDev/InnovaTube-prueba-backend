const { InnovaUser } = require('../models');

const emailExist = async(email = '') => {
   const emailDB = await InnovaUser.findOne({email});

   if (emailDB){
      throw new Error(`El email ${email} ya está registrado en la base de datos, contacte a su administrador`);
   }
}

module.exports = {
   emailExist
}
