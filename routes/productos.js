const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT, validarCampos } = require("../middlewares");
const { adminRole } = require("../middlewares/validar-roles");

const {
  categorieExistsValidation,
  productExistsValidation,
} = require("../helpers/db-validators");

const {
  crearProducto,
  productosGet,
  productoGetByID,
  productoPut,
  productoDelete,
} = require("../controllers/products");

const router = Router();

router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es necesario").not().isEmpty(),
    check("categoria", "no es id de mongo").isMongoId(),
    validarCampos,
    check("categoria").custom(categorieExistsValidation),
  ],
  crearProducto
);

//Obtener las productos -publico
router.get("/", [], productosGet);

//Obtener una categoria por id -publico
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    check("id").custom(productExistsValidation),
    validarCampos,
  ],
  productoGetByID
);

// //actualizar categoria - privado - cualquier usuario con un token valido
router.put(
  "/:id",
  [
    validarJWT,
    // check("categoria", "no es id de mongo").isMongoId(),
    validarCampos,
    check("id").custom(productExistsValidation),
  ],
  productoPut
);

//borrar categoria - privado - cualquier usuario con un token valido
router.delete(
  "/:id",
  [
    validarJWT,
    adminRole,
    check("id", "No es un ID valido").isMongoId(),
    validarCampos,
    check("id").custom(productExistsValidation),
  ],
  productoDelete
);

module.exports = router;
