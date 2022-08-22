const { response } = require("express");
const Usuario = require("../models/usuario");
const bcryptjs = require("bcryptjs");
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
  const { correo, password } = req.body;

  try {
    //verificar si correo existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario)
      return res
        .status(400)
        .json({ msg: "usuario / password no son correctos - correo " });

    //Verificar si el usuario esta activo
    if (usuario.estado === false)
      return res
        .status(400)
        .json({ msg: "usuario / password no son correctos - estado: false " });

    //Verificar si la contraseña es correcta
    const validPassword = bcryptjs.compareSync(password, usuario.password);
    if (!validPassword)
      return res
        .status(400)
        .json({ msg: "usuario / password no son correctos - password " });

    //Generar JWT
    const token = await generarJWT(usuario.id);

    res.json({
      usuario,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: "hable con el administrador",
    });
  }
};

module.exports = {
  login,
};
