const Rol = require("../models/role");
const Usuario = require("../models/usuario");

const isValidRole = async (rol = "") => {
  const existeRol = await Rol.findOne({ rol });
  if (!existeRol) throw new Error(`El rol ${rol} no esta registrado en la BD`);
};

const emailExistsValidation = async (correo = "") => {
  const emailExists = await Usuario.findOne({ correo });
  if (emailExists)
    throw new Error(
      `El email ${email} ya esta registrado en la BD`
    );
};

const userExistsValidation = async (id) => {
  const userExists = await Usuario.findById(id);
  if (!userExists) throw new Error(`El id ${id} no esta registrado en la BD`);
};

module.exports = {
  isValidRole,
  emailExistsValidation,
  userExistsValidation,
};
