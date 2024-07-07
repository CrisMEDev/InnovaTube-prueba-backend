const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../db/config');

class Server {

   constructor(){
      this.app = express();
      this.port = process.env.PORT;

      this.paths = {
         auth:                                  '/innova-tube/auth',
         user:                                  '/innova-tube/user',
         videos:                                '/innova-tube/videos',
      }

      this.databaseConnection();

      this.middlewares();

      this.routes();
   }

   async databaseConnection(){

      await dbConnection();
      
   }

   middlewares(){
      this.app.use(cors());
      this.app.use( express.json() );
   }

   routes(){

      this.app.use(this.paths.auth,                                     require('../routes/auth'));
      this.app.use(this.paths.user,                                     require('../routes/user'));
      this.app.use(this.paths.videos,                                   require('../routes/videos'));
      
   }

   listen(){
      this.app.listen( this.port , () => {
         console.log('Servidor corriendo en el puerto: ', this.port);
      });
   };
   
}


module.exports = Server;
