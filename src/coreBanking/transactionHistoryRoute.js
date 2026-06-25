const Express = require("express");
const tH_router = Express.Router();
const { getTransactionHistory, seeOneTransaction } = require("./transactionHistoryController");
const { protect } = require("../utils/authMiddleware");

tH_router.get( "/transactions", protect, getTransactionHistory );
tH_router.get( "/transaction/:reference", protect, seeOneTransaction );

module.exports = tH_router;