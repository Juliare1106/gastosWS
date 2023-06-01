const { Schema, model } = require("mongoose");
const { GeneralUser } = require("../general_user");
const { Category } = require("../app/category");

const SpentSchema = new Schema({
  value: {
    type: Number,
    required: [true, "Valor requerido requerida"],
  },
  description: {
    type: String,
    required: [true, "Descripción requerida"],
  },
  type: {
    type: Number,
    required: [true, "Tipo requerido"],
  },
  status: {
    type: Boolean,
    required: [true, "Estado requerido"],
  },
  month: {
    type: Number,
    required: [true, "Valor requerido requerida"],
  },
  year: {
    type: Number,
    required: [true, "Valor requerido requerida"],
  },
  date: {
    type: Date,
    required: [true, "Valor requerido requerida"],
  },
  user: {
    type: Schema.ObjectId,
    ref: GeneralUser,
    required: [true, "Usuario es requerido"],
  },
  category: {
    type: Schema.ObjectId,
    ref: Category,
    required: [true, "Categoría requerida"],
  },
});

const Spent = model("Spent", SpentSchema);
module.exports.Spent = Spent;