const { createProduct, updateProduct, deletedProduct, getAllProucts } = require("../controller/product.controller");
const  {isAuthenticated, isAuthorised}  = require("../middleware/auth");

const productRouter = require("express").Router();

productRouter.get("/product",isAuthenticated,isAuthorised('VENDER'),getAllProucts);
productRouter.post("/product/create",isAuthenticated,createProduct);
productRouter.patch("/product/update/:id",updateProduct);
productRouter.delete("/product/delete/:id",deletedProduct);

module.exports = productRouter;
