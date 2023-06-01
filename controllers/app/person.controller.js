const { mongoose } = require('mongoose');
const { response, request } = require("express");
const { Person } = require("../../models/app/person");



const PersonGet = async (req = request, res = response) => {
  const { id } = req.query;

  const [person] = await Promise.all([
    Person.aggregate([
      {
        '$match': {
          '_id': new mongoose.Types.ObjectId(id)
        }
      }
    ]),
]);

  res.status(200).json({
    person,
  });
};

const PersonGetAll = async (req = request, res = response) => {
  const type = req.query;
  const [client] = await Promise.all([
    Person.aggregate([
      {
        '$match': {
          'type': type
        }
      }
    ])
  ]);
  res.status(200).json({
    client
  });
};

const PersonGetCount = async (req = request, res = response) => {
  const type = req.query;
  let counter = "";
  if(type=== undefined){
    counter = await Promise.all([
      Person.aggregate([
        {
            '$count': 'count'
        }
    ]),
  ]);
  }else{
    counter = await Promise.all([
      Person.aggregate([
        {
          '$match': {
            'type': type
          }
        }, {
          '$count': 'count'
        }
      ]),
  ]);
  }


  res.status(200).json({
    counter
  });
};

const PersonPost = async (req, res = response) => {
  const { document, first_name, last_name, email, adress,phone_number,status_client, type } = req.body;

  const client = new Client({
    document,
    first_name,
    last_name,
    email,
    adress,
    phone_number,
    status_client,
    type

  });
  //guardar bd
  client.save();
  res.status(200).json({
    avaliable: true,
    exist: true,
    msg: "Registro Creado",
    client,
  });
};

const PersonPut = async (req, res = response) => {
  const { document, first_name, last_name, email,adress,phone_number,status_client,type } = req.body;
  const { id } = req.params;
  const obj = await Person.findByIdAndUpdate(id, {document,first_name, last_name, email,adress,phone_number,status_client,type});
  res.status(200).json({
    msg: "Datos Actualizados",
    obj,
  });
};



module.exports = {
  PersonGet,
  PersonGetAll,
  PersonPut,
  PersonPost,
  PersonGetCount
};