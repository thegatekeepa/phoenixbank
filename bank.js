const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/configs/database");

dotenv.config();
connectDB();
const bank = express();
bank.use(express.json());


const PORT = process.env.PhoPort || 2020;
  bank.listen(PORT, () => {
    console.log(`Phoenix Bank Server has gone live on ${PORT}`);
  });

const RegoRouter = require("./src/register/registerRoute");
//const transferRouter = require("./src/coreBanking/route.transfer");

bank.use("/api/account", RegoRouter);
//bank.use("/api/account", transferRouter);


module.exports = bank;
