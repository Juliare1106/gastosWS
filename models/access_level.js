const { Schema, model } = require("mongoose");

const AccessLevelSchema = new Schema({
  access_level: {
    type: String,
    required: [true, "Nivel de acceso es requerido"],
  }
});

const AccessLevel = model("AccessLevel", AccessLevelSchema);
module.exports.AccessLevel = AccessLevel;
