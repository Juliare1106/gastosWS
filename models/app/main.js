const { Schema, model } = require("mongoose");
const { Main } = require("../app/category");

const MainSchema = new Schema({
    value : {
      type: Number,
      required: [true, "Valor"],
    },
    type: {
      type: String,
      required: [true, "Tipo es requerido"],
    },
    status: {
      type: Boolean,
      required: [true, "Estado requerido"],
    },
    category: {
      type: Schema.ObjectId,
      ref: categories,
      required: [true, "Categoria requerida"],
    },
  });

  const Main = model("Main", MainSchema);
module.exports.Main = Main;