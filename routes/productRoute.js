const route = require("express").Router();
const productController = require("../controllers/productController");
const categoryController = require("../controllers/categoryController");
const imageController = require("../controllers/imageController");

route.get("/", productController.getAllProduct);
route.get("/categories", categoryController.getAllCategories);
route.get("/:id", productController.getProductById);
route.post(
  "/",
  imageController.upload.array("cloudinput"),
  productController.createProduct,
  imageController.uploadImage
);
route.put("/:id", productController.updateProduct);
route.delete("/:id", productController.deleteProduct);

route.post("/createcategory", categoryController.createCategory);

module.exports = route;
