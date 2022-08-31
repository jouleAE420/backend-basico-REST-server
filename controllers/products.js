const { Producto, Categoria } = require("../models");

const crearProducto = async (req, res = response, next) => {
  const { estado, usuario, ...body } = req.body;

  const productoDB = await Producto.findOne({ nombre: req.body.nombre });

  if (productoDB)
    return res.status(400).json({
      msg: `el producto ${productoDB.nombre} ya existe`,
    });

  //Generar data a guardar
  const data = {
    ...body,
    usuario: req.usuario._id,
    nombre: body.nombre.toUpperCase(),
  };
  const producto = new Producto(data);
  //Guardar DB
  await producto.save();

  res.status(201).json({
    producto,
  });
};

const productosGet = async (req, res) => {
  const { limite = 5, desde = 0 } = req.query;

  const [total, productos] = await Promise.all([
    Producto.countDocuments({ estado: true }),
    Producto.find({ estado: true })
      .limit(Number(limite))
      .skip(Number(desde))
      .populate("usuario", "nombre")
      .populate("categoria", "nombre"),
  ]);

  res.json({
    total,
    productos,
  });
};

const productoGetByID = async (req = request, res = response) => {
  const { id } = req.params;
  const producto = await Producto.findById(id)
    .populate("usuario", "nombre")
    .populate("categoria", "nombre");
  res.json({ producto });
};

//actualizar Producto
const productoPut = async (req, res = response) => {
  const { id } = req.params;
  const { estado, usuario, ...data } = req.body;
  data.nombre = data.nombre.toUpperCase();
  data.usuario = req.usuario._id;

  const producto = await Producto.findByIdAndUpdate(id, data, {
    new: true,
  });

  res.json({ producto });
};

//borrarCategoria -estado:false
const productoDelete = async (req, res = response) => {
  const { id } = req.params;

  const producto = await Producto.findByIdAndUpdate(
    id,
    { estado: false, disponible: false },
    { new: true }
  );
  res.json({
    producto,
  });
};

module.exports = {
  crearProducto,
  productosGet,
  productoGetByID,
  productoPut,
  productoDelete,
};
