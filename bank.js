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
const loginRouter = require("./src/login/loginRoute");
const transferRouter = require("./src/coreBanking/transferRoute");
const balRouter = require("./src/coreBanking/balanceRoute");
const tH_router = require("./src/coreBanking/transactionHistoryRoute");
//const tH_router = require("./src/coreBanking/transactionHistoryRoute")

bank.use("/api/account", RegoRouter);
bank.use("/api/account", loginRouter);
bank.use("/api/account/funds", transferRouter);
bank.use("/api/account", balRouter);
bank.use("/api/account/view", tH_router);
//bank.use("/api/account/view_one", tH_router);

module.exports = bank;
