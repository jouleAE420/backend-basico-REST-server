const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config.js");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.paths = {
      auth: "/api/auth",
      usuarios: "/api/users",
      productos: "/api/productos",
      categorias: "/api/categorias",
      buscar: "/api/buscar",
    };

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
    this.app.use(this.paths.auth, require("../routes/auth.js"));

    this.app.use(this.paths.usuarios, require("../routes/users.js"));

    this.app.use(this.paths.productos, require("../routes/productos.js"));
    this.app.use(this.paths.buscar, require("../routes/buscar.js"));
    this.app.use(this.paths.categorias, require("../routes/categories.js"));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log("Servidor corriendo en: ", this.port);
    });
  }
}

module.exports = Server;
