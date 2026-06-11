const express = require("express");
const onbRouter = express.Router();
const { bvnValidate } = require("./bvnValidate");

onbRouter.post("/onboard", bvnValidate);

module.exports = onbRouter;