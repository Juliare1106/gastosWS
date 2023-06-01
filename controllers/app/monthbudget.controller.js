
const { mongoose } = require('mongoose');
const { response, request } = require("express");
const { MonthBudget } = require("../../models/app/monthbudget");
const { GeneralUser } = require('../../models/general_user');



const MonthBudgetGet = async (req = request, res = response) => {
  const { id } = req.query;
  const [monthbudget] = await Promise.all([
    MonthBudget.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId(id)
        }
      }
    ]),
  ]);

  res.status(200).json({
    MonthBudget: monthbudget
  });
};

const MonthBudgetGetUser = async (req = request, res = response) => {
  const { id } = req.query;
  const { date } = req.query;

  const globalDate = new Date(date);
  const month = globalDate.getMonth();
  const year = globalDate.getFullYear();
  const [monthbudget] = await Promise.all([
    MonthBudget.aggregate([
      {
        '$lookup': {
          'from': 'generalusers', 
          'localField': 'user', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$match': {
          'month' : month,
          'year' : year,
          'user._id': new mongoose.Types.ObjectId(id)
        }
      }
    ]).limit(1),
  ]);

  res.status(200).json({
    MonthBudget: monthbudget
  });
 };


const MonthBudgetPost = async (req, res = response) => {
  const { value,date, user, status } = req.body;

  const globalDate = new Date(date);
  const month = globalDate.getMonth();
  const year = globalDate.getFullYear();

  console.log("Valor",value);

  const monthbudget = new MonthBudget({
    value,
    month,
    year,
    user,
    status
  });

  const [existBudget] = await Promise.all([
    MonthBudget.aggregate([
      {
        '$lookup': {
          'from': 'generalusers', 
          'localField': 'user', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$match': {
          'month' : month,
          'year' : year,
          'user._id': new mongoose.Types.ObjectId(user)
        }
      }
    ]),
  ]);

  if (existBudget.length>0) {
    return res.status(400).json({
      msg: "El presupuesto ya existe",
    });
  }
  //guardar bd
  monthbudget.save();
  res.status(200).json({
    msg: "Registro Creado",
    monthbudget,
  });
};

const MonthBudgetPut = async (req, res = response) => {
  const { value, status} = req.body;
  const { id } = req.params;

  const existMonthBudget = await MonthBudget.findById(id);
  if (!existMonthBudget) {
    return res.status(400).json({
      msg: "No existe el presupuesto",
    });
  }

  const obj = await MonthBudget.findByIdAndUpdate(id, { value, status });
  res.status(200).json({
    msg: "Presupuesto actualizado",
    obj,
  });
};


module.exports = {
  MonthBudgetGet,
  MonthBudgetGetUser,
  MonthBudgetPost,
  MonthBudgetPut
};







































