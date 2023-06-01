const { check } = require("express-validator");
const { validatorError } = require("../../middlewares/validator");
const { thereIsClient } = require("../../helpers/db-validators");

const {
  PackingGet,
  PackingPost,
  PackingGetAll,
  PackingGetCount,
  PackingPut
} = require("../../controllers/app/packing.controller");

const router = require("express").Router();

router.get("/",
check("id").custom(thereIsClient),
 PackingGet);
 
router.get("/all",
PackingGetAll);

router.get("/count",
PackingGetCount);

router.post(
  "/",
  [
    check("client", "Cliente invalido").notEmpty(),
    check("code", "Código invalido").notEmpty(),
    check("tag", "Etiqueta invalida").notEmpty(),
    check("status", "Estado invalido").notEmpty(),
    validatorError,
  ],
  PackingPost
);

router.put(
  "/:id",
  [
    check("status", "Estado invalido").notEmpty(),
    check("date", "Fecha invalida").notEmpty(),
    check("address", "Dirección invalida").notEmpty(),
    validatorError,
  ],
  PackingPut
);

module.exports = router;

