const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/configs/database");

dotenv.config();
connectDB();
const app = express();
app.use(express.json());


const PORT = process.env.PhoPort || 2020;
  app.listen(PORT, () => {
    console.log(`Phoenix Bank Server has gone live on ${PORT}`);
  });

//const onboardingRoutes = require("./src/routes/onboarding.routes");  
//routes
//app.use("/api/customer", onboardingRoutes);
//app.use("/api/auth", require("./routes/authRoutes"));
//app.use("/api/notes", require("./routes/noteRoutes"));


module.exports = app;
