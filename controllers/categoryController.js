const { Category } = require("../models");

exports.getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.findAll();
    categories.sort((a, b) => {
      if (a.name.toUpperCase() > b.name.toUpperCase()) {
        return 1;
      } else if (a.name.toUpperCase() < b.name.toUpperCase()) {
        return -1;
      }
      return 0;
    });
    res.json({ categories });
  } catch (err) {
    next(err);
  }
};

exports.createCategory = async (req, res, next) => {
  try {
    const { name, desc } = req.body;
    if (!name || typeof name !== "string" || !name.trim())
      return res.status(400).json({ message: "name is required and must be a string" });

    const category = await Category.create({
      name,
      desc,
    });
    res.status(201).json({ message: "category created" });
  } catch (err) {
    next(err);
  }
};
