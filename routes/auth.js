const { check } = require("express-validator");
const router = require("express").Router();

const { login } = require("../controllers/auth");

router.post(
  "/",
  [
    check("mail", "El correo es obligatorio").isEmail(),
    check("password", "La contraseña es obligatoria").not().isEmpty()
  ],
  login
);

module.exports = router;
