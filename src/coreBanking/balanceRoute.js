const Express = require("express");
const balRouter = Express.Router();
const { getAcctBalance } = require("./balanceController");
const { protect } = require("../utils/authMiddleware");

balRouter.get("/balance", protect, getAcctBalance);

module.exports = balRouter;