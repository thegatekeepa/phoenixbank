const express = require("express");
const transferRouter = express.Router();
const {
    transferFunds, 
    accountBalance
} = require("./controller.transfer");

transferRouter.post( "/transfer", transferFunds);
transferRouter.get("/balance", accountBalance);

module.exports = transferRouter;
