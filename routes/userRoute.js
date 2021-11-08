const route = require("express").Router();
const userController = require("../controllers/userController");
const addressController = require("../controllers/addressController");
const passport = require("passport");
const paymentController = require("../controllers/paymentController");

route.post("/register", userController.register);
route.post("/login", userController.login);

route.get("/address", passport.authenticate("jwt", { session: false }), addressController.getAllAddress);
route.get("/address/:id", passport.authenticate("jwt", { session: false }), addressController.getAddressById);
route.post("/address/create", passport.authenticate("jwt", { session: false }), addressController.createAddress);
route.put("/address/update/:id", passport.authenticate("jwt", { session: false }), addressController.updateAddress);
route.delete("/address/delete/:id", passport.authenticate("jwt", { session: false }), addressController.deleteAddress);

route.get("/payment", passport.authenticate("jwt", { session: false }), paymentController.getAllPayment);
route.post("/payment", passport.authenticate("jwt", { session: false }), paymentController.createPayment);

module.exports = route;
