const { check } = require("express-validator");
const { validatorError } = require("../../middlewares/validator");
const { thereIsUser } = require("../../helpers/db-validators");

const {
  CategoryGet,
  CategoryPost,
  CategoryGetAll,
  CategoryGetUser,
  CategoryGetCount,
  CategoryPut
} = require("../../controllers/app/category.controller");

const router = require("express").Router();

router.get("/",
check("id").custom(thereIsUser),
CategoryGet);
 
router.get("/all",
CategoryGetAll);

router.get("/user",
check("id").custom(thereIsUser),
CategoryGetUser);

router.get("/count",
CategoryGetCount);

router.post(
  "/",
  [
    check("description", "Descripción invalida").notEmpty(),
    check("status", "Estado invalido").notEmpty(),
    check("user", "Usuario invalido").notEmpty(),
    validatorError,
  ],
  CategoryPost
);

router.put(
  "/:id",
  [
    check("description", "Descripción invalida").notEmpty(),
    check("status", "Estado invalido").notEmpty(),
    check("user", "Usuario invalido").notEmpty(),
    validatorError,
  ],
  CategoryPut
);

module.exports = router;

