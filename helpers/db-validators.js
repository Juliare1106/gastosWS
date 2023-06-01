const { AccessLevel } = require("../models/access_level");
const { GeneralUser } = require("../models/general_user");
const { Parking } = require("../models/app/packing");
const { Person } = require("../models/app/person");

const isAccessLevel = async (access_level = "") => {
  const existAccessLevel = await AccessLevel.findOne({ access_level });
  if (!existAccessLevel) {
    throw new Error("El nivel de acceso no esta definido.");
  }
};

const thereIsMail = async (mail = "") => {
  const thereismail = await GeneralUser.findOne({ mail });
  if (thereismail) {
    throw new Error("El email se encuentra registrado.");
  }
};

const thereIsId = async (id) => {
  const thereisid = await GeneralUser.findById(id);
  if (!thereisid) {
    throw new Error("El ID no existe.");
  }
};

const thereIsIdParking = async (id) => {
  const thereisid = await Parking.findById(id);
  if (!thereisid) {
    throw new Error("El ID no existe.");
  }
};

const thereIsPerson = async (id) => {
  const thereIsPerson = await Person.findById(id);
  if (!thereIsPerson) {
    throw new Error("El cliente no existe.");
  }
};

const thereIsUser = async (id) => {
  const thereIsUser = await GeneralUser.findById(id);
  if (!thereIsUser) {
    throw new Error("El usuario no existe.");
  }
};

module.exports = {
  isAccessLevel,
  thereIsMail,
  thereIsId,
  thereIsIdParking,
  thereIsPerson,
  thereIsUser
};
