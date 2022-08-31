const { Router } = require("express");
const { check } = require("express-validator");

const {
  crearCategoria,
  categoriasGet,
  categoriaGetByID,
  categoriaDelete,
  categoriaPut,
} = require("../controllers/categories");
const { categorieExistsValidation } = require("../helpers/db-validators");
const { validarJWT, validarCampos } = require("../middlewares/index");
const { adminRole } = require("../middlewares/validar-roles");

const router = Router();

/**
 * {{url}}/api/categorias
 */

//Obtener las categorias-publico
router.get("/", [], categoriasGet);

//Obtener una categoria por id -publico
router.get(
  "/:id",
  [
    check("id", "No es un ID valido").isMongoId(),
    validarCampos,
    check("id").custom(categorieExistsValidation),
  ],
  categoriaGetByID
);

//Crear una categoria - privado - cualquier usuario con un token valido
router.post(
  "/",
  [
    validarJWT,
    check("nombre", "El nombre es necesario").not().isEmpty(),
    validarCampos,
  ],
  crearCategoria
);

// //actualizar categoria - privado - cualquier usuario con un token valido
router.put(
  "/:id",
  [
    validarJWT,
    check("nombre", "el nombre es necesario").not().isEmpty(),
    validarCampos,
    check("id").custom(categorieExistsValidation),
  ],
  categoriaPut
);

//borrar categoria - privado - cualquier usuario con un token valido
router.delete(
  "/:id",
  [
    validarJWT,
    adminRole,
    check("id", "No es un ID valido").isMongoId(),
    validarCampos,
    check("id").custom(categorieExistsValidation),
  ],
  categoriaDelete
);

module.exports = router;
