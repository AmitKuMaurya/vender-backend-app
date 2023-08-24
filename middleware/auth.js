const JWT = require("jsonwebtoken");
const UserModel = require("../model/user.model");
require("dotenv").config();
const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];

    if (!token) return next("Not Authenticated");

    const decoding = JWT.verify(token,process.env.JWTSECRET);
    const userId = decoding["userID"];
    const modelVerification = await UserModel.findOne({ _id: userId });

    if (decoding) {
      req["userId"] = decoding["userID"];
      if (modelVerification.email === decoding["email"]) {
        next();
      }
    }
  } catch (err) {
    res.status(501).send({ err: `Inernal Server Problem !` });
  }
};

const isAuthorised = (...role) => {
  return async (req, res, next) => {
    // console.log(req['userId'])
    const userId = req["userId"];
    const user = await UserModel.findById({ _id: userId }).select("+role");
    // console.log(user.role);
    if (!role.includes(user.role)) {
      return next(`Roles: ${user.role} is not Authorized for this route`);
    }
    next();
  };
};

module.exports = { isAuthenticated, isAuthorised };
