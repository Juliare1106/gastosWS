const { Schema, model } = require("mongoose");
const { Person } = require("./person");

const PackingSchema = new Schema({
  client: {
    type: Schema.ObjectId,
    ref: Person,
    required: [true, "Cliente es requerido"],
  },
  register_date: {
    type: Date,
    default: Date.now,
  },
  code: {
    type: String,
    required: [true, "Código requerido"],
  },
  tag: {
    type: String,
    required: [true, "Etiqueta requerido"],
  },
  status: {
    type: String,
    default: 1
  },
  date: {
    type: Date,
  },
  address: {
    type: String,
  },
});

const Packing = model("Packing", PackingSchema);
module.exports.Packing = Packing;

