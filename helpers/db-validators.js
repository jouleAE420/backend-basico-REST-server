const { Producto } = require("../models");
const Rol = require("../models/role");
const Usuario = require("../models/usuario");

const isValidRole = async (rol = "") => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) throw new Error(`El rol ${rol} no esta registrado en la BD`);
};

const emailExistsValidation = async (correo = "") => {
  const emailExists = await Usuario.findOne({ correo });
  if (emailExists)
    throw new Error(`El email ${email} ya esta registrado en la BD`);
};

const userExistsValidation = async (id) => {
  const userExists = await Usuario.findById(id);
  if (!userExists) throw new Error(`El id ${id} no esta registrado en la BD`);
};

/**
 *
 * categorias
 */

const categorieExistsValidation = async (id) => {
  const categorieExists = await Categoria.findById(id);
  if (!categorieExists)
    throw new Error(`la categoria con id ${id} no esta registrado en la BD`);
};


/**
 * Productos
 */
 const productExistsValidation = async (id) => {
  const productExists = await Producto.findById(id);
  if (!productExists)
    throw new Error(`El producto con id ${id} no esta registrado en la BD`);
};


module.exports = {
  isValidRole,
  emailExistsValidation,
  userExistsValidation,
  categorieExistsValidation,
  productExistsValidation
};
