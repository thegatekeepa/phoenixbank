const Express = require("express");
const loginRouter = Express.Router();

const { loginCustomer } = require(
    "./loginController"
);

loginRouter.post("/login", loginCustomer);

module.exports = loginRouter;
