const express = require("express");
const transferRouter = express.Router();
const { transferFunds } = require("./controller.transfer");

transferRouter.post( "/transfer", transferController.transferFunds);

module.exports = transferRouter;
