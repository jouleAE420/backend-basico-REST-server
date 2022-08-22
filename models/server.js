const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usuariosRoutePath = "/api/users";
    this.authPath = "/api/auth";


    //Conectar a DB
    this.conectarDB();

    //Middleware: fucniones que añaden funcionalidades al web server
    this.middlewares();
    //rutas de mi aplicacion
    this.routes();
  }

  async conectarDB() {
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Parseo y lectura de body
    this.app.use(express.json());

    //Directorio publico
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.authPath, require("../routes/auth.js"));

    this.app.use(this.usuariosRoutePath, require("../routes/users.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en: ", this.port);
    });
  }
}

module.exports = Server;
