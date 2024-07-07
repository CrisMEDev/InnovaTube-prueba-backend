const { Schema, model } = require('mongoose');

const InnovaUserSchema = new Schema({

   firstName: {
      type: String,
      required: [true, 'El nombre es obligatorio'],
      trim: true
   },

   lastName: {
      type: String,
      trim: true
   },

   profilePicture: {
      type: String,
      trim: true
   },

   email: {
      type: String,
      unique: true
   },

   password: {
      type: String,
      required: [true, 'La contraseña es obligatoria']
   },

   favorites: {
      type: [Object],
      default: []
   },

   status: {
      type: Boolean,
      default: true
   },

},

   {
      timestamps: true
   }

);

InnovaUserSchema.methods.toJSON = function () {

   // Genera una instancia de mi Schema con sus valores respectivos
   const { __v, status, _id, password, ...innovaUser } = this.toObject();

   innovaUser.uid = _id;

   return innovaUser;
}

module.exports = model('InnovaUser', InnovaUserSchema);

