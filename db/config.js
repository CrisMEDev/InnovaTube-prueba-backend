const mongoose = require('mongoose');

const dbConnection = async() => {

   try {
      
      await mongoose.connect( process.env.MONGODB_CONNECT );

      console.log('Base de datos en línea');
      
   } catch (error) {

      console.log(error);
      throw new Error('Error al iniciar la base de datos');
      
   }
   
}

module.exports = {
   dbConnection
}

