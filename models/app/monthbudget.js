const { Schema, model } = require("mongoose");
const { GeneralUser } = require("../general_user");

const MonthBudgetSchema = new Schema({
  register_date: {
    type: Date,
    default: Date.now,
  },
  value:{
    type: Number,
    required: [true, "Valor requerido"],
  },
  month:{
    type: Number,
    required: [true, "Mes requerido"],
  },
    year : {
      type: Number,
      required: [true, "Año requerido"],
    },
    status : {
      type: Boolean,
      default: true,
      required: [true, "Estado requerido"],
    },
    user: {
      type: Schema.ObjectId,
      ref: GeneralUser,
      required: [true, "Usuario es requerido"],
    },
  });

  const MonthBudget = model("MonthBudget", MonthBudgetSchema);
module.exports.MonthBudget = MonthBudget;