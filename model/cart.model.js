const mongoose = require("mongoose");

const CartSchema = mongoose.Schema({
    userID : { type : mongoose.Types.ObjectId, ref : "user", required : true},
    cartBucket : [{ type : mongoose.Types.ObjectId, ref : "product" ,required : true}],
});

const CartModel = mongoose.model("cart",CartSchema);
module.exports = CartModel;

