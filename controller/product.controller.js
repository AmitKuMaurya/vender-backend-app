const ProductModel = require("../model/product.model");

exports.createProduct = async (req, res) => {
  const { name, price, category } = req.body;

  const create = await ProductModel.create({
    name,
    price,
    category,
  });

  // await create.save();

  res.status(201).send({
    msg: `Product Created !`,
    product: create,
  });
};
exports.getAllProucts = async (req, res) => {
  const products = await ProductModel.find();
  if (products.length < 0) {
    res.status(404).send({ msg: "you do not have any poduct yet" });
  }
  res.status(404).send({
    msg: "Products Are Fetched !",
    products: products,
  });
};

exports.updateProduct = async (req, res, next) => {
    const { id } = req.params;
    const { name, price, category } = req.body;
    const doesExist = await ProductModel.findById({ _id: id });
    if (!doesExist) next("This product does not exist");
    const update = await ProductModel.findByIdAndUpdate(
        { _id: id },
        { $set: { name, price, category } },
    { new: true }
  );
  res.status(201).send({
    msg: "Product Upadted !",
    updatedProduct: update,
  });
};

exports.deletedProduct = async (req, res, next) => {
    const { id } = req.params;
    const doesExist = await ProductModel.findById({ _id: id });
    if (!doesExist) next("This product does not exist");
    const deleted = await ProductModel.findByIdAndDeleted({ _id: id });
  res.status(201).send({
    msg: "Product Deleted !",
    deletedProduct: deleted,
  });
};
