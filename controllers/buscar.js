const { response } = require("express");
const { ObjectId } = require("mongoose").Types;

const { Usuario, Categoria, Producto } = require("../models");

const coleccionesPermitidas = ["categorias", "productos", "roles", "usuarios"];

const buscarUsuarios = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const usuario = await Usuario.findById(termino);
    return res.json({
      results: usuario ? [usuario] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //Insensibilidad a mayusculas
  const total = await Usuario.count({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  const usuarios = await Usuario.find({
    $or: [{ nombre: regex }, { correo: regex }],
    $and: [{ estado: true }],
  });
  res.json({
    count: total,
    results: usuarios,
  });
};

const buscarCategorias = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const categoria = await Categoria.findById(termino);
    return res.json({
      results: categoria ? [categoria] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //Insensibilidad a mayusculas
  const total = await Categoria.count({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  });

  const categorias = await Categoria.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
  });

  res.json({
    count: total,
    results: categorias,
  });
};

const buscarProductos = async (termino = "", res = response) => {
  const esMongoID = ObjectId.isValid(termino);

  if (esMongoID) {
    const producto = await Producto.findById(termino).populate(
      "categoria",
      "nombre"
    );
    return res.json({
      results: producto ? [producto] : [],
    });
  }

  const regex = new RegExp(termino, "i"); //Insensibilidad a mayusculas
  const total = await Producto.count({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
    // $and:[{disponible:true}]
  });

  const productos = await Producto.find({
    $or: [{ nombre: regex }],
    $and: [{ estado: true }],
    // $and:[{disponible:true}]
  }).populate("categoria", "nombre");

  res.json({
    count: total,
    results: productos,
  });
};
const buscar = (req, res = response) => {
  const { coleccion, termino } = req.params;
  if (!coleccionesPermitidas.includes(coleccion)) {
    res.status(400).json({
      msg: `Las colecciones permitidas son ${coleccionesPermitidas}`,
    });
  }

  switch (coleccion) {
    case "usuarios":
      buscarUsuarios(termino, res);
      break;
    case "categorias":
      buscarCategorias(termino, res);
      break;
    case "productos":
      buscarProductos(termino, res);

      break;

    default:
      res.status(500).json({
        msg: "se me olvido hacer esta busqueda",
      });
  }
};

module.exports = {
  buscar,
};
