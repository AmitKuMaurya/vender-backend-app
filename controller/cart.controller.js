const CartModel = require("../model/cart.model");

exports.createCart = async (req, res) => {
    const { userID, cartBucket } = req.body;
    const create = await CartModel.create({
        userID,
        cartBucket
    });
    res.status(201).send({
        msg: `Product added to cart`,
        cartBucket: create
    });
}

exports.updateCart = async (req, res) => {
    const { id } = req.params;
    const { ...cartBucket } = req.body;
    const update = await CartModel.findByIdAndUpdate({ _id: id }, { $set: cartBucket }, { new: true });

    res.status(201).send({
        msg: `Product Upadted To Cart`,
        updatedCartBucket: update
    });
}

exports.cartUsers = async(req,res) => {
    const cart = await CartModel.find()
    .populate('userID')
    .populate('cartBucket')
    if (cart.length < 0) {
      res.status(404).send({ msg: "you do not have any poduct in cart yet" });
    }
    res.status(404).send({
      msg: "cart Are Fetched !",
      cart: cart,
    });
}


// Test Assessment


// You are building an ECommerce multi vendor project , You need to create APIs for vendors as well as Users

// Create role based authentication for vendors and users (implement secure authentication mechanism)
// Create logout APIs as well as logout from all devices
// Create CRUD operations for products (only vendors can create and update products)
// Create card APIs (only users can manage their APIs)
// Create simple check out APIs where users can purchase their products which added in their carts
// Create an order for each purchase
// Also Create review basic APIs for products where users can review and rate and show ratings on get Product APIs.
// Note - Text as to be used nodejs , postgresQL, Express, Redis
