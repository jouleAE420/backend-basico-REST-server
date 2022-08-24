const { response } = require("express");

const adminRole = (req, res = response, next) => {
  if (!req.usuario)
    return res
      .status(500)
      .json({ msg: "se quiere verificar el rol sin validar token" });

  const { rol, nombre } = req.usuario;
  if (rol !== "ADMIN_ROLE")
    return res.status(401).json({
      msg: `${nombre} no es administrador y no puede hacer esto`,
    });

  next();
};

const tieneRol = (...roles) => {
  return (req, res, next) => {
    if (!req.usuario)
      return res
        .status(500)
        .json({ msg: "se quiere verificar el rol sin validar token" });

    if (!roles.includes(req.usuario.rol))
      return res.status(401).json({
        msg: `el servicio requiere un ode estos roles ${roles}`,
      });

    next();
  };
};

module.exports = {
  adminRole,
  tieneRol,
};
