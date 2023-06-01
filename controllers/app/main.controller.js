
const { mongoose } = require('mongoose');
const { response, request } = require("express");
const { Main } = require("../../models/app/Main");
const { Category } = require('../../models/models/category');


const MainGet = async (req = request, res = response) => {
  const { id } = req.query;
  const [Main] = await Promise.all([
    Main.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId(id)
        }
      }
    ]),
  ]);

  res.status(200).json({
    Main: Main
  });
};

const MainGetUser = async (req = request, res = response) => {
  const { user } = req.query;
  const [Main] = await Promise.all([
    Main.aggregate([
      {
        '$lookup': {
          'from': 'generalusers', 
          'localField': 'user', 
          'foreignField': '_id', 
          'as': 'User'
        }
      }
    ]),
  ]);

  res.status(200).json({
    Main: Main
  });
};

const MainGetAll = async (req = request, res = response) => {
  const [Main] = await Promise.all([
    Main.find(),
  ]);
  res.status(200).json({
    Main
  });
};

const MainGetCount = async (req = request, res = response) => {
  const counter = await Promise.all([
    Main.aggregate([
      {
        '$count': 'count'
      }
    ]),
  ]);

  res.status(200).json({
    counter
  });
};

const MainPost = async (req, res = response) => {
  const { description, user, status } = req.body;

  const Main = new Main({
    description,
    user,
    status
  });

  const existUser = await GeneralUser.findById(user);
  if (!existUser) {
    return res.status(400).json({
      msg: "Usuario no registrado",
    });
  }

  const existMain = await Main.findOne({ description });
  if (existMain) {
    return res.status(400).json({
      msg: "Categoria ya existe.",
    });
  }
  console.log(Main);
  //guardar bd
  Main.save();
  res.status(200).json({
    msg: "Registro Creado",
    Main,
  });
};

const MainPut = async (req, res = response) => {
  const { description, status} = req.body;
  const { id } = req.params;

  const existMain = await Main.findById(id);
  if (!existMain) {
    return res.status(400).json({
      msg: "Categoría no existe.",
    });
  }

  const obj = await Main.findByIdAndUpdate(id, { description, status });
  res.status(200).json({
    msg: "Categoria actualizada",
    obj,
  });
};


module.exports = {
  MainGet,
  MainGetAll,
  MainGetUser,
  MainGetCount,
  MainPost,
  MainPut
};







































