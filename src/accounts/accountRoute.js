const express = require("express");
const acctRouter = express.Router();

const { createAccount } = require("./accountController");

acctRouter.post("/create", createAccount);

module.exports = acctRouter;