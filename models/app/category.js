const { Schema, model } = require("mongoose");
const { GeneralUser } = require("../general_user");

const CategorySchema = new Schema({
    description: {
      type: String,
      required: [true, "Descripción requerida"],
    },
    status: {
      type: Boolean,
      required: [true, "Estado requerido"],
    },
    user: {
      type: Schema.ObjectId,
      ref: GeneralUser,
      required: [true, "Usuario es requerido"],
    },
  });

  const Category = model("Category", CategorySchema);
module.exports.Category = Category;