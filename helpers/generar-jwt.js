const jwt = require("jsonwebtoken");

const generarJWT = async (uid = "") => {
  //Le mandamis ek UID para que no tenga mas informacion el JWT
  return new Promise((resolve, reject) => {
    const payload = { uid };
    jwt.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: "4h",
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject("No se pudo generar el token");
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generarJWT };
