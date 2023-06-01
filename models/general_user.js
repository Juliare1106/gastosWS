const { Schema, model } = require("mongoose");

const GeneralUserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Nombre es requerido"],
  },
  lastname: {
    type: String,
    required: [true, "Apellido es requerido"],
  },
  mail: {
    type: String,
    required: [true, "Email es requerido"],
  },
  password: {
    type: String,
    required: [true, "Contraseña es requerido"],
  },
  status: {
    type: Boolean,
    required: [true, "Estado es requerido"],
  },
  access_level: {
    type: String,
    enum: ["GERENTE", "ADMINISTRADOR", "EMPACADOR", "USUARIO", "RECEPCIONISTA"],
    required: [true, "Nivel de acceso es requerido"],
  },
  register_date: {
    type: Date,
    default: Date.now,
  },

});

GeneralUserSchema.methods.toJSON = function () {
  const { __v, password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

const GeneralUser = model("GeneralUser", GeneralUserSchema);
module.exports.GeneralUser = GeneralUser;
