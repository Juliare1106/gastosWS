const { Schema, model } = require("mongoose");

const PersonSchema = new Schema({
    _id: {
        type: Schema.ObjectId,
      },
        document: {
      type: String,
      required: [true, "Documento requerido"],
    },
    first_name: {
        type: String,
        required: [true, "Nombre requerido"],
      },
      last_name: {
        type: String,
        required: [true, "Apellido requerido"],
      },
      email: {
        type: String,
        required: [true, "Correo requerido"],
      },
      adress: {
        type: String,
        required: [true, "Dirección requerido"],
      },
       phone_number: {
        type: String,
        required: [true, "Teléfono requerido"],
      },
      status_client: {
        type: Boolean
      },
      type: {
        type: String,
        required: [true, "Tipo requerido"],
      }
  });

  const Person = model("Person", PersonSchema);
module.exports.Person = Person;