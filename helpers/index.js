const dbValidators = require('./db-validators');
const generateJWT = require('./generate-jwt');
const validatePassword = require('./validate-password');


module.exports = {
   ...dbValidators,
   ...generateJWT,
   ...validatePassword
}