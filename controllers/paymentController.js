const { UserPayment } = require("../models");

exports.getAllPayment = async (req, res, next) => {
  try {
    const accounts = await UserPayment.findAll({ where: { userId: req.user.id } });
    res.json({ accounts });
  } catch (err) {
    next(err);
  }
};

exports.createPayment = async (req, res, next) => {
  try {
    const { accountNo, type } = req.body;
    if ((accountNo, type)) {
      const account = await UserPayment.create({
        accountNo,
        type,
        userId: req.user.id,
      });
      res.status(201).json({ account });
    } else {
      res.status(400).json({ message: "Invalid Number or Bank" });
    }
  } catch (err) {
    next(err);
  }
};
