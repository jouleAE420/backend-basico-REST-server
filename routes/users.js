const { Router } = require("express");
const { check } = require("express-validator");

const { validarCampos } = require("../middlewares/validar-campos");
const {
  isValidRole,
  emailExistsValidation,
  userExistsValidation,
} = require("../helpers/db-validators");
const {
  usuariosGet,
  usuariosDelete,
  usuariosPatch,
  usuariosPost,
  usuariosPut,
} = require("../controllers/users");
const router = Router();

router.get("/", usuariosGet);

router.put(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(userExistsValidation),
    check("rol").custom(isValidRole),
    validarCampos,
  ],
  usuariosPut
);

router.post(
  "/",
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(), //Validacion de nombre
    check("password", "El password debe contener mas de 6 letras").isLength({
      min: 6,
    }), //Validacion de nombre
    check("correo", "El correo no es válido").isEmail(), //Validacion de correo
    check("correo").custom(emailExistsValidation),
    check("rol").custom(isValidRole),
    validarCampos,
  ],
  usuariosPost
);

router.delete(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(userExistsValidation),
    validarCampos,
  ],
  usuariosDelete
);
router.patch("/", usuariosPatch);

module.exports = router;
