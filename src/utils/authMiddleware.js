//auth middle ware for authenticating and protecting core banking transactions per customer

const jwt = require("jsonwebtoken");
const Customer = require("../register/customerModel");

const protect = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token =
        req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET
      );

      req.user = await Customer.findById(
        decoded.id
      );

      next();
    } else {
      return res.status(401).json({
        message: "Not authorized. No token provided."
      });
    }
  } catch (error) {
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = { protect };