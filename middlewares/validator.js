const { response, request } = require("express");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");

const validatorError = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      msg: "Error(es) en validaciones",
      errors,
    });
  }
  next();
};

const validatorJWT = (req = request, res = response, next) => {
  const token = req.header("Authorization");
  if (!token) {
    return res.status(401).json({
      msg: "No se encuentra el token.",
    });
  }

  try {
    const { uid } = jwt.verify(token, process.env.SECRETKEY);
    req.uid = uid;
  } catch (error) {
    res.status(401).json({
      msg: "El Token no es valido.",
    });
  }

  next();
};

module.exports = {
  validatorError,
  validatorJWT,
};
