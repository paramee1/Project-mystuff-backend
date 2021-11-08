const { Product, Category, Images } = require("../models");

exports.getAllProduct = async (req, res, next) => {
  try {
    const item = await Product.findAll({ include: Images });
    res.json({ products: item });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Product.findOne({ where: { id } });
    res.json({ product: item });
  } catch (err) {
    next(err);
  }
};

exports.createProduct = async (req, res, next) => {
  try {
    const { title, desc, price, quantity, categoryId } = req.body;
    const category = await Category.findOne({ where: { id: categoryId } });
    const add = await Product.create({
      title,
      desc,
      price,
      quantity,
      categoryId: category.id,
    });
    next();
  } catch (err) {
    next(err);
  }
};

exports.updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, desc, price, quanity, name } = req.body;
    const category = await Category.findOne({ where: { name } });
    // const product = await Product.findOne({ where: { id } });
    // const [rows] = await Product.update(
    //   {
    //     title: title ?? product.title,
    //     desc: desc ?? product.desc,
    //     price: price ?? product.price,
    //     quanity: quanity ?? product.quanity,
    //     categoryId: category.id,
    //   },
    //   { where: { id } }
    // );
    const [rows] = await Product.update({ title, desc, price, quanity, categoryId: category.id }, { where: { id } });

    if (rows === 0) {
      return res.status(400).json({ message: "fail to update product" });
    }
    res.status(200).json({ message: "success update product" });
  } catch (err) {
    next(err);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rows = await Product.destroy({
      where: {
        id,
      },
    });
    if (rows === 0) {
      return res.status(400).json({ message: "fail to delete product" });
    }
    res.status(204).json({ message: "success delete product" });
  } catch (err) {
    next(err);
  }
};
