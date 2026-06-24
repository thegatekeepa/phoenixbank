const express = require("express");
const transferRouter = express.Router();
const { transferFunds } = require("./transferController");
const { protect } = require("../utils/authMiddleware");

transferRouter.post( "/transfer", protect, transferFunds);

module.exports = transferRouter;
