const { response, request } = require("express");
const bcryptjs = require("bcryptjs");
const Usuario = require("../models/usuario");
const usuario = require("../models/usuario");

const usuariosGet = async (req = request, res = response) => {
  const { limite = 5, desde = 0 } = req.query;

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }),
    Usuario.find({ estado: true }).limit(Number(limite)).skip(Number(desde)),
  ]);

  res.json({
    total,
    usuarios,
  });
};

const usuariosPost = async (req, res = response) => {
  const { nombre, correo, password, rol } = req.body;
  const usuario = new Usuario({ nombre, correo, password, rol });

  //Encriptar la contraseña
  const salt = bcryptjs.genSaltSync();
  usuario.password = bcryptjs.hashSync(password, salt);

  //Guardar en BD
  await usuario.save();

  res.json({
    usuario,
  });
};

const usuariosPut = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, correo, ...resto } = req.body;
  //TODO: Validar contra DB
  if (password) {
    const salt = bcryptjs.genSaltSync();
    resto.password = bcryptjs.hashSync(password, salt);
  }
  const usuarioDB = await Usuario.findByIdAndUpdate(id, resto);

  res.json({ usuarioDB });
};

const usuariosDelete = async (req, res = response) => {
  const { id } = req.params;
  //Lo borramos fisicamente (No recomendado)
  // const usuario=await Usuario.findByIdAndDelete(id)

  const usuario = await Usuario.findByIdAndUpdate(id, { estado: false });

  res.json({
    usuario,
  });
};

const usuariosPatch = (req, res = response) => {
  res.json({
    msg: "patch API- Controlador",
  });
};

module.exports = {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
};
