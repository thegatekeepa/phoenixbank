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

//use check now
const onboRoutes = require("./src/onboarding/onboardingRoute");

bank.use("/api/customer", onboRoutes);




//const onboardingRoutes = require("./src/routes/onboarding.routes");  
//routes
//bank.use("/api/customer", onboardingRoutes);
//bank.use("/api/auth", require("./routes/authRoutes"));
//bank.use("/api/notes", require("./routes/noteRoutes"));


module.exports = bank;
