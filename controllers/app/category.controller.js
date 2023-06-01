
const { mongoose } = require('mongoose');
const { response, request } = require("express");
const { Category } = require("../../models/app/category");
const { GeneralUser } = require('../../models/general_user');



const CategoryGet = async (req = request, res = response) => {
  const { id } = req.query;
  const [category] = await Promise.all([
    Category.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId(id)
        }
      }
    ]),
  ]);

  res.status(200).json({
    category: category
  });
};

const CategoryGetUser = async (req = request, res = response) => {
  const { id } = req.query;
  const [category] = await Promise.all([
    Category.aggregate([
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
    category: category
  });
 };

const CategoryGetAll = async (req = request, res = response) => {
  const [category] = await Promise.all([
    Category.find(),
  ]);
  res.status(200).json({
    category
  });
};

const CategoryGetCount = async (req = request, res = response) => {
  const counter = await Promise.all([
    Category.aggregate([
      {
        '$count': 'count'
      }
    ]),
  ]);

  res.status(200).json({
    counter
  });
};

const CategoryPost = async (req, res = response) => {
  const { description, user, status } = req.body;

  const category = new Category({
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

  const existCategory = await Category.findOne({ description });
  if (existCategory) {
    return res.status(400).json({
      msg: "Categoria ya existe.",
    });
  }
  console.log(category);
  //guardar bd
  category.save();
  res.status(200).json({
    msg: "Registro Creado",
    category,
  });
};

const CategoryPut = async (req, res = response) => {
  const { description, status} = req.body;
  const { id } = req.params;

  const existCategory = await Category.findById(id);
  if (!existCategory) {
    return res.status(400).json({
      msg: "Categoría no existe.",
    });
  }

  const obj = await Category.findByIdAndUpdate(id, { description, status });
  res.status(200).json({
    msg: "Categoria actualizada",
    obj,
  });
};


module.exports = {
  CategoryGet,
  CategoryGetAll,
  CategoryGetUser,
  CategoryGetCount,
  CategoryPost,
  CategoryPut
};







































