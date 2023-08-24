const authRouter = require("express").Router();
const { register, login, allUsers } = require("../controller/user.controller");

authRouter.get("/auth/users",allUsers);
authRouter.post("/auth/create",register);
authRouter.post("/auth/login",login);

module.exports = authRouter;
