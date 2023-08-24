const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
    email : { type : String, required : true},
    password : { type : String, required : true},
    role : { type : String, required : true, enum : ["ADMIN","VENDER","CUSTOMER"], default : "CUSTOMER"}
});

const UserModel = mongoose.model("user",UserSchema);
module.exports = UserModel;

