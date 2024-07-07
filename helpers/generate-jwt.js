const jwt = require('jsonwebtoken');

const generateJWT = (uid) => {

   return new Promise((resolve, reject) => {

      const payload = { uid };

      jwt.sign(payload, process.env.SECRET_OR_PRIVATE_KEY, {
         expiresIn: '24h',    // el token durará 24 horas
      }, (error, token) => {
         if (error) {
            console.log(error);
            reject('No se pudo generar el JWT');
         } else {
            resolve(token);
         }
      });

   });

}

module.exports = {
   generateJWT
}