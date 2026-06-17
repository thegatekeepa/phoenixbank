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

const onboRoutes = require("./src/onboarding/onboardingRoute");
const acctRouter = require("./src/accounts/accountRoute");
const transferRouter = require("./src/transfer/route.transfer");

bank.use("/api/customer", onboRoutes);
bank.use("/api/account", acctRouter);
bank.use("/api/account", transferRouter);


module.exports = bank;
