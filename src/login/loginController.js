const Customer = require("../register/customerModel");
const jwt = require("jsonwebtoken");
const generateToken = require("../utils/generateToken");

const loginCustomer = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find customer
    const existingCustomer = await Customer.findOne({
      email,
    }).select("+password");

    if (!existingCustomer) {
      return res.status(404).json({
        message: "Sorry, customer not found.",
      });
    }

    // Compare password with hashed password
    const isMatch =
      await existingCustomer.comparePassword(password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Incorrect password.",
      });
    }

    // Generate JWT for authenticated user
    const token = generateToken(existingCustomer._id);
    //const token = jwt.sign(
      //{ id: Customer._id },
      //process.env.JWT_SECRET, {
        //expiresIn: "1d",
      //}
    //);

    return res.status(200).json({
      message: "Login successful",
      id: existingCustomer._id,
      firstName: existingCustomer.firstName,
      lastName: existingCustomer.lastName,
      token,
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  loginCustomer,
};
