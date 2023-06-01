const { check } = require("express-validator");
const { validatorError } = require("../../middlewares/validator");

const {
  ParameterGet,
  ParameterPost,
  ParameterPut,
} = require("../../controllers/app/parameter.controller");

const router = require("express").Router();

router.get("/", ParameterGet);
router.post(
  "/",
  [
    check("yard", "Información de patio invalida").notEmpty(),
    check("type", "Tipo vehículo invalido").notEmpty(),
    check("quota", "Cupo invalido").notEmpty(),
    validatorError,
  ],
  ParameterPost
);

router.put(
  "/",
  [
    check("yard", "Información de patio invalida").notEmpty(),
    check("type", "Tipo vehículo invalido").notEmpty(),
    check("quota", "Cupo invalido").notEmpty(),
    validatorError,
  ],
  ParameterPut
);

module.exports = router;

