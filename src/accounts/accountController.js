const Account = require("./accountModel");
const Customer = require("../onboarding/customerModel");
const nibssService = require("../services/nibss.services");

const createAccount = async (req, res) => {
  try {
    const { kycType, kycID, dob } = req.body;

    // 1. Verify customer exists
    const newCustomer = await Customer.findOne({ bvn: kycID });

    if (!newCustomer) {
      return res.status(404).json({
        message: "Customer not found",
      });
    }

    // 2. Ensure BVN is verified
    if (newCustomer.status !== "ONBOARDED") {
      return res.status(400).json({
        message: "Customer is not eligible for account creation. Onboarding is incomplete.",
      });
    }

    // 3. Ensure only one account per customer
    const existingAccount = await Account.findOne({ bvn: kycID });

    if (existingAccount) {
      return res.status(409).json({
        message: "Customer already has an account",
      });
    }

    // 4. Call NIBSS to create account
    const nibssResponse = await nibssService.createAccount({
      kycType,
      kycID,
      dob
    });

    // 5. Save account locally
    const newAccount = await Account.create({
      bvn: newCustomer.bvn,
      accountNumber: nibssResponse.accountNumber,
      balance: 15000,
    });

    return res.status(201).json({
      message: "Account created successfully",
      data: newAccount,
    });
  } catch (error) {
    console.error("Account creation failed:", error.message);

    return res.status(500).json({
      message: "Account creation failed",
      error: error.message,
    });
  }
};

module.exports = { createAccount };

