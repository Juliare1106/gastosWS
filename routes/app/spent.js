const { check } = require("express-validator");
const { validatorError } = require("../../middlewares/validator");
const { thereIsUser } = require("../../helpers/db-validators");

const {
  SpentGet,
  SpentPost,
  SpentGetAll,
  SpentGetUser,
  SpentGetCount,
  SpentPut,
  SpentGetUserAll,
  SpentGetUserSum
} = require("../../controllers/app/spent.controller");

const router = require("express").Router();

router.get("/",
check("id").custom(thereIsUser),
SpentGet);
 
router.get("/all",
SpentGetAll);

router.get("/user",
check("id").custom(thereIsUser),
SpentGetUser);

router.get("/userall",
check("id").custom(thereIsUser),
SpentGetUserAll);

router.get("/usersum",
check("id").custom(thereIsUser),
SpentGetUserSum);

router.get("/count",
SpentGetCount);

router.post(
  "/",
  [
    check("value", "Valor invalido").notEmpty(),
    check("description", "Descripción invalida").notEmpty(),
    check("status", "Estado invalido").notEmpty(),
    check("user", "Usuario invalido").notEmpty(),
    check("type", "Tipo invalido").notEmpty(),
    validatorError,
  ],
  SpentPost
);

router.put(
  "/:id",
  [
    check("value", "Valor invalido").notEmpty(),
    check("description", "Descripción invalida").notEmpty(),
    check("status", "Estado invalido").notEmpty(),
    check("user", "Usuario invalido").notEmpty(),
    check("type", "Tipo invalido").notEmpty(),
    validatorError,
  ],
  SpentPut
);

module.exports = router;

