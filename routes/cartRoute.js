const route = require("express").Router();
const cartController = require("../controllers/cartController");
const passport = require("passport");
const orderController = require("../controllers/orderController");

route.get("/order/:orderId", orderController.getOrderById);
route.get("/order", orderController.getAllOrder);
route.delete("/order/:orderId", orderController.deleteOrder);
route.put("/orderupdate/:orderId", orderController.updataSatusOrder);
route.put("/cancelOrder/:orderId", orderController.cancelSatusOrder);
route.get("/orderItem/:orderId", orderController.getAllOrderItem);
route.get("/orderUser", passport.authenticate("jwt", { session: false }), orderController.getOrderByUserId);
route.delete("/checkout", passport.authenticate("jwt", { session: false }), orderController.cancleOrder);
route.post("/checkout", passport.authenticate("jwt", { session: false }), orderController.createOrder);
route.post("/confirm", passport.authenticate("jwt", { session: false }), orderController.createOrderItem);

route.get("/", passport.authenticate("jwt", { session: false }), cartController.getCartItem);
route.post("/:id", passport.authenticate("jwt", { session: false }), cartController.createCartItem);
route.delete("/:id", passport.authenticate("jwt", { session: false }), cartController.deleteCartItem);
route.post("/", cartController.createCart);

module.exports = route;
