const { check } = require("express-validator");
const { validatorError, validatorJWT } = require("../middlewares/validator");
const {
  isAccessLevel,
  thereIsMail,
  thereIsId,
} = require("../helpers/db-validators");

const {
  generalUserGet,
  generalUserPost
} = require("../controllers/general_users.controller");

const router = require("express").Router();

router.get("/", generalUserGet);
router.post(
  "/",
  [
    //check("mail", "El correo no es válido").isEmail(),
    //check("mail").custom(thereIsMail),
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("lastname", "El apellido es obligatorio").not().isEmpty(),
    check("password", "La contraseña es válida")
      .not()
      .isEmpty()
      .isLength({ min: 6 }),
    check("access_level").custom(isAccessLevel),
    validatorError,
  ],
  generalUserPost
);


module.exports = router;
