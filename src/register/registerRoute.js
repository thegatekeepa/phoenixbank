const Express = require("express");
const RegoRouter = Express.Router();

const {registerCustomer} = require("./registerController");


RegoRouter.post("/register", registerCustomer);

module.exports = RegoRouter;
