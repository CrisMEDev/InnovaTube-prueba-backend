const passwordValidator = require('password-validator');


const validatePassword = ( password ) => {

    // Crea el schema
    const schema = new passwordValidator();

    // Se agregan propiedades a el
    schema
        .has().min(6)
        .has().lowercase(1)
        .has().uppercase(1)
        .has().digits(1)
    

    return schema.validate( password );
}


module.exports = {
    validatePassword
}