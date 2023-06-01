const { check } = require("express-validator");
const { validatorError } = require("../../middlewares/validator");
const { thereIsUser } = require("../../helpers/db-validators");

const {
  MonthBudgetGet,
  MonthBudgetPost,
  MonthBudgetGetUser,
  MonthBudgetPut
} = require("../../controllers/app/monthbudget.controller");

const router = require("express").Router();

router.get("/",
check("id").custom(thereIsUser),
MonthBudgetGet);

router.get("/user",
check("id").custom(thereIsUser),
MonthBudgetGetUser);

router.post(
  "/",
  [
    check("value", "Valor invalida").notEmpty(),
    check("status", "Estado invalido").notEmpty(),
    check("user", "Usuario invalido").notEmpty(),
    validatorError,
  ],
  MonthBudgetPost
);

router.put(
  "/:id",
  [
    check("value", "Valor invalida").notEmpty(),
    check("status", "Estado invalido").notEmpty(),
    check("user", "Usuario invalido").notEmpty(),
    validatorError,
  ],
  MonthBudgetPut
);

module.exports = router;

