const { check } = require("express-validator");
const { thereIsClient } = require("../../helpers/db-validators");

const {
  PersonGet,
  PersonPost,
  PersonPut,
  PersonGetAll,
  PersonGetCount
} = require("../../controllers/app/person.controller");

const router = require("express").Router();

router.get("/",
check("id").custom(thereIsClient),
PersonGet);

router.get("/all",
PersonGetAll);

router.get("/count",
PersonGetCount);

router.post(
  "/",
  PersonPost
);
router.put(
  "/:id",
  check("id").custom(thereIsClient),
  PersonPut
);

module.exports = router;