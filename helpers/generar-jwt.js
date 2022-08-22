const jwt = require("jsonwebtoken");

const generarJWT = async ( uid = "") => {
  //Le mandamis ek UID para que no tenga mas informacion el JWT
  return new Promise((req, res) => {
    const payload = { uid };
    jwt.sign( payload, "Est03sMyPub1cK3y23@913", ( err, token ) => {
 
        if ( err ) {
            console.log(err);
            reject( 'No se pudo generar el token' )
        } else {
            resolve( token );
        }
    })
  });
};

module.exports = { generarJWT };
