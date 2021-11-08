const { Order, OrderItem, User, UserAddress, Product } = require("../models");

exports.getAllOrder = async (req, res, next) => {
  try {
    const allOrder = await Order.findAll({ include: [{ model: User }, { model: UserAddress }] });
    res.json({ order: allOrder });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({ where: { id: orderId }, include: [{ model: User }] });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

exports.getOrderByUserId = async (req, res, next) => {
  try {
    const { id } = req.user;
    const order = await Order.findAll({ where: { userId: id }, include: [{ model: User }] });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};
exports.getAllOrderItem = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const allOrderItem = await OrderItem.findAll({
      where: { orderId },
      include: [{ model: Order }, { model: Product }],
    });
    res.json({ order: allOrderItem });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const { userAddressId } = req.body;
    const order = await Order.create({
      userId: req.user.id,
      userAddressId,
    });
    res.json({ order });
  } catch (err) {
    next(err);
  }
};

exports.cancleOrder = async (req, res, next) => {
  try {
    const cancleOrder = await Order.destroy({ where: { userId: req.user.id } });
    if (cancleOrder === 0) {
      return res.status(400).json({ message: "fail to delete item" });
    }
    res.json({ cancleOrder });
  } catch (err) {
    next(err);
  }
};

exports.createOrderItem = async (req, res, next) => {
  try {
    const { total, productId, orderId } = req.body;
    const orderItem = await OrderItem.create({
      orderId,
      productId,
      total,
    });
    res.json({ orderItem });
  } catch (err) {
    next(err);
  }
};

exports.updataSatusOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderupdate = await Order.update({ status: true }, { where: { id: orderId } });
    res.json({ orderupdate });
  } catch (err) {
    next(err);
  }
};

exports.cancelSatusOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderupdate = await Order.update({ isCancel: true }, { where: { id: orderId } });
    res.json({ orderupdate });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orderItemDelete = await OrderItem.destroy({ where: { orderId } });
    const orderDelete = await Order.destroy({ where: { id: orderId } });
    res.json({ orderDelete, orderItemDelete });
  } catch (err) {
    next(err);
  }
};
