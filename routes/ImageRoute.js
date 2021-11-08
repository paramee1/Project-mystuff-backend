const route = require("express").Router();
const imageController = require("../controllers/imageController");

route.get("/", imageController.getAllImages);
route.get("/:id", imageController.getImageById);

module.exports = route;
