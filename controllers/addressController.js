const { UserAddress } = require("../models");

exports.getAllAddress = async (req, res, next) => {
  try {
    const allAddress = await UserAddress.findAll({ where: { userId: req.user.id } });
    res.json({ address: allAddress });
  } catch (err) {
    next(err);
  }
};

exports.getAddressById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const address = await UserAddress.findOne({ where: { id: id, userId: req.user.id } });
    res.json({ oneAddress: address });
  } catch (err) {
    next(err);
  }
};

exports.createAddress = async (req, res, next) => {
  try {
    const { address, city, postalCode } = req.body;
    if ((address, city, postalCode)) {
      const userAddress = await UserAddress.create({
        address,
        city,
        postalCode,
        userId: req.user.id,
      });
      res.status(201).json({ userAddress });
    } else {
      res.status(400).json({ message: "Invalid address, city or post/zip" });
    }
  } catch (err) {
    next(err);
  }
};

exports.updateAddress = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { address, city, postalCode } = req.body;
    const [rows] = await UserAddress.update({ address, city, postalCode }, { where: { id, UserId: req.user.id } });
    if (rows === 0) {
      return res.status(400).json({ message: "fail to update list" });
    }
    res.status(200).json({ message: "success update list" });
  } catch (err) {
    next(err);
  }
};

exports.deleteAddress = async (req, res, next) => {
  try {
    const rows = await UserAddress.destroy({
      wehere: {
        id: req.params.id,
        userId: req.user.id,
      },
    });
    if (rows === 0) {
      return res.status(400).json({ message: "fail to delete list" });
    }
    res.status(204).json();
  } catch (err) {
    next(err);
  }
};
