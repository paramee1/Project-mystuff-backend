const { CartItem, Cart, User, Product, Images } = require("../models");

exports.getCartItem = async (req, res, next) => {
  try {
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    const item = await CartItem.findAll({ where: { cartId: cart.id }, include: [{ model: Product, include: Images }] });
    res.status(200).json({ item });
  } catch (err) {
    next(err);
  }
};

exports.createCart = async (req, res, next) => {
  try {
    const { username } = req.body;
    const user = await User.findOne({ where: { username } });
    const cart = await Cart.create({
      userId: user.id,
    });
    res.status(200).json({ message: "cart has been created" });
  } catch (err) {
    next(err);
  }
};

exports.createCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { quantity, price } = req.body;
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    const item = await CartItem.create({
      cartId: cart.id,
      productId: id,
      quantity,
      price,
    });
    res.status(201).json({ message: "Item in cart" });
  } catch (err) {
    next(err);
  }
};

exports.deleteCartItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await Cart.findOne({ where: { userId: req.user.id } });
    const item = await CartItem.destroy({ where: { productId: id, cartId: cart.id } });
    if (item === 0) {
      return res.status(400).json({ message: "fail to delete item" });
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
