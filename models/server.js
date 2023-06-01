const express = require("express");
var cors = require("cors");
const { dbConnection } = require("../database/config");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.authPath = "/login";
    this.generalUserPath = "/user";
    this.personPath = "/person";
    this.categoryPath = "/category";
    this.monthbudgetPath = "/monthbudget";
    this.spentPath = "/spent";

    // Conectar a Bd
    this.connectDB();
    // Middlewares
    this.middleswares();
    this.routes();
  }

  async connectDB() {
    await dbConnection();
  }
  routes() {
    this.app.use(this.authPath, require("../routes/auth"));
    this.app.use(this.generalUserPath, require("../routes/general_users"));
    this.app.use(this.personPath, require("../routes/app/person"));
    this.app.use(this.categoryPath, require("../routes/app/category"));
    this.app.use(this.monthbudgetPath, require("../routes/app/montbudget"));
    this.app.use(this.spentPath, require("../routes/app/spent"));

    this.app.use("*", (req, res) => {
      res.status(404).json({
        msg: "URL no encontrada",
      });
    });
  }

  middleswares() {
    this.app.use(cors());
    this.app.use(express.json());
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Server corriendo en el puerto:", this.port);
    });
  }
}
module.exports = Server;

