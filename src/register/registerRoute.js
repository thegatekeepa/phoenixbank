const Express = require("express");
const RegoRouter = Express.Router();

const {registerCustomer} = require("./registerController");


RegoRouter.post("/register", registerCustomer);
//router.post("/login", loginUser);
//router.delete("/:id", deleteUser);

module.exports = RegoRouter;
