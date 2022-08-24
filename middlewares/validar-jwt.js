const { response } = require("express");
const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");

const validarJWT = async (req, res = response, next) => {
  const token = req.header("x-token");
  if (!token)
    return res.status(401).json({ msg: "no hay token en la peticion" });
  // console.log(token);
  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    //leer usuario que corresponde al uid
    const usuario = await Usuario.findById(uid);

    if (!usuario)
      return res.status(401).json({
        msg: "usuario no exixste en db",
      });

    //verificcar si el uid tiene el estado en true
    if (!usuario.estado)
      return res.status(401).json({
        msg: "token no valido -usuario con estado=false",
      });

    req.usuario = usuario;

    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "Jtoken no valido" });
  }
};

module.exports = {
  validarJWT,
};
