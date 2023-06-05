
const { mongoose } = require('mongoose');
const { response, request } = require("express");
const { Spent } = require("../../models/app/spent");
const { GeneralUser } = require('../../models/general_user');



const SpentGet = async (req = request, res = response) => {
  const { id } = req.query;
  const [spent] = await Promise.all([
    Spent.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId(id)
        }
      }
    ]),
  ]);

  res.status(200).json({
    msg : "OK",
    spent: spent
  });
};

const SpentGetUser = async (req = request, res = response) => {
  const { id } = req.query;
  const { date } = req.query;

  const globalDate = new Date(date);
  const month = globalDate.getMonth();
  const year = globalDate.getFullYear();
  const [spent] = await Promise.all([
    Spent.aggregate([
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
    ]),
  ]);

  res.status(200).json({
    msg : "OK",
    spent: spent
  });
 };

 const SpentGetUserSum = async (req = request, res = response) => {
  const { id } = req.query;
  const { date } = req.query;

  const globalDate = new Date(date);
  const month = globalDate.getMonth();
  const year = globalDate.getFullYear();
  const [spent] = await Promise.all([
    Spent.aggregate([
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
      },{
        '$group': {
          '_id': null, 
          'total': {
            '$sum': '$value'
          }
        }
      }
    ]),
  ]);

  res.status(200).json({
    msg : "OK",
    spent: spent
  });
 };

 const SpentGetUserByMonthCategory= async (req = request, res = response) => {
  const { id } = req.query;
  const { date } = req.query;

  const globalDate = new Date(date);
  const month = globalDate.getMonth();
  const year = globalDate.getFullYear();
  const [spent] = await Promise.all([
    Spent.aggregate([
      {
        '$lookup': {
          'from': 'generalusers', 
          'localField': 'user', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$match': {
          'month': month, 
          'year': year, 
          'user._id': new mongoose.Types.ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'categories', 
          'localField': 'category', 
          'foreignField': '_id', 
          'as': 'categoriaInfo'
        }
      }, {
        '$unwind': '$categoriaInfo'
      }, {
        '$group': {
          '_id': '$category', 
          'categoria': {
            '$first': '$categoriaInfo.description'
          }, 
          'totalGastos': {
            '$sum': '$value'
          }
        }
      }
    ]),
  ]);

  res.status(200).json({
    msg : "OK",
    spent: spent
  });
 };

 const SpentGetUserGlobalCategory= async (req = request, res = response) => {
  const { id } = req.query;
  const { date } = req.query;

  const globalDate = new Date(date);
  const month = globalDate.getMonth();
  const year = globalDate.getFullYear();
  const [spent] = await Promise.all([
    Spent.aggregate([
      {
        '$lookup': {
          'from': 'generalusers', 
          'localField': 'user', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$match': {
          'user._id': new mongoose.Types.ObjectId(id)
        }
      }, {
        '$lookup': {
          'from': 'categories', 
          'localField': 'category', 
          'foreignField': '_id', 
          'as': 'categoriaInfo'
        }
      }, {
        '$unwind': '$categoriaInfo'
      }, {
        '$group': {
          '_id': '$category', 
          'categoria': {
            '$first': '$categoriaInfo.description'
          }, 
          'totalGastos': {
            '$sum': '$value'
          }
        }
      }
    ]),
  ]);

  res.status(200).json({
    msg : "OK",
    spent: spent
  });
 };

 const SpentGetUserAll = async (req = request, res = response) => {
  const { id } = req.query;

  const [spent] = await Promise.all([
    Spent.aggregate([
      {
        '$lookup': {
          'from': 'generalusers', 
          'localField': 'user', 
          'foreignField': '_id', 
          'as': 'user'
        }
      }, {
        '$match': {
          'user._id': new mongoose.Types.ObjectId(id)
        }
      }
    ]),
  ]);

  res.status(200).json({
    msg : "OK",
    spent: spent
  });
 };

const SpentGetAll = async (req = request, res = response) => {
  const [spent] = await Promise.all([
    Spent.find(),
  ]);
  res.status(200).json({
    msg : "OK",
    spent: spent
  });
};

const SpentGetCount = async (req = request, res = response) => {
  const spent = await Promise.all([
    Spent.aggregate([
      {
        '$count': 'count'
      }
    ]),
  ]);

  res.status(200).json({
    msg : "OK",
    spent: spent
  });
};

const SpentPost = async (req, res = response) => {
  const { value, description, type, date, category, user, status } = req.body;
  const globalDate = new Date(date);
  const month = globalDate.getMonth();
  const year = globalDate.getFullYear();

  const spent = new Spent({
    value,
    description,
    type,
    month,
    year,
    date,
    user,
    category,
    status
  });

  const existUser = await GeneralUser.findById(user);
  if (!existUser) {
    return res.status(400).json({
      msg: "Usuario no registrado",
    });
  }
  spent.save();
  res.status(200).json({
    msg: "Registro Creado",
    spent,
  });
};

const SpentPut = async (req, res = response) => {
  const {  value, description, type, category, date, status} = req.body;
  const { id } = req.params;
  const globalDate = new Date(date);
  const month = globalDate.getMonth();
  const year = globalDate.getFullYear();

  const existSpent = await Spent.findById(id);
  if (!existSpent) {
    return res.status(400).json({
      msg: "Gasto no existe.",
    });
  }

  const obj = await Spent.findByIdAndUpdate(id, { value, description, type, category, month, year, date, status });
  res.status(200).json({
    msg: "Gasto actualizado",
    obj,
  });
};


module.exports = {
  SpentGet,
  SpentGetAll,
  SpentGetUser,
  SpentGetUserAll,
  SpentGetUserByMonthCategory,
  SpentGetUserGlobalCategory,
  SpentGetCount,
  SpentGetUserSum,
  SpentPost,
  SpentPut
};







































