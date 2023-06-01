const { response, request } = require("express");
const bcrypt = require("bcryptjs");

const { GeneralUser } = require("../models/general_user");

const login = async (req, res = response) => {
  const { mail, password } = req.body;
  try {
    const user = await GeneralUser.findOne({ mail });
    if (!user) {
      return res.status(400).json({
        msg: "Credenciales incorrectas.",
      });
    }
    if (user.status === false) {
      return res.status(400).json({
        msg: "Usuario Inactivo",
      });
    }
    const isPassWord = bcrypt.compareSync(password, user.password);
    if (!isPassWord) {
      return res.status(400).json({
        msg: "Credenciales incorrectas.",
      });
    } else {
      let name = user.name;
      return res.status(200).json({
        msg: 'Acceso correcto, bienvenido ', name,
        id: user._id,
        mail: user.mail,
        name: user.name,
        lastname: user.lastname,

      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ msg: "Algo salio mal" });
  }
};

module.exports = {
  login,
};
