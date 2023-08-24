const { createCart, updateCart, cartUsers } = require("../controller/cart.controller");
const  {isAuthenticated}  = require("../middleware/auth");

const cartRouter = require("express").Router();
 cartRouter.get("/cart/users",cartUsers);
 cartRouter.post("/cart/create",createCart);
 cartRouter.patch("/cart/update/:id",updateCart);

module.exports = cartRouter;
