const { response, request } = require("express");
const bcrypt = require("bcryptjs");
const { GeneralUser } = require("../models/general_user");

const generalUserGet = async (req = request, res = response) => {
  const { limit = 5, paginator } = req.query;
  const query = { status: true };

  const [total, users] = await Promise.all([
    GeneralUser.countDocuments(query),
    GeneralUser.find(query).limit(Number(limit)).skip(Number(paginator)),
  ]);
  res.status(200).json({
    total,
    users,
  });
};

const generalUserPost = async (req, res = response) => {
  const { name, lastname, mail, password, status, access_level } = req.body;
    const user = await GeneralUser.findOne({ mail });
    if (user) {
      return res.status(400).json({
        msg: "La cuenta que intenta registrar ya existe.",
      });
    }
  console.log(user);
  const generalUser = new GeneralUser({
    name,
    lastname,
    mail,
    password,
    status,
    access_level,
  });
  //encriptar contraseña
  var salt = bcrypt.genSaltSync();
  generalUser.password = bcrypt.hashSync(password, salt);
  generalUser.status = true;

  //guardar bd
  generalUser.save();
  res.status(200).json({
    msg: "Usuario Creado",
    generalUser,
  });
};

module.exports = {
  generalUserGet,
  generalUserPost
};
