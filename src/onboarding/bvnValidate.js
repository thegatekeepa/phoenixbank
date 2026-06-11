//main onboarding file for bvn validation in onboarding process
const Customer = require("./customerModel");
const nibssService = require("../services/nibss.services");

const bvnValidate = async (req, res) => {
  try {
    const { bvn } = req.body;

    if (!bvn) {
      return res.status(400).json({
        message: "BVN is required",
      });
    }

    const customerIdentity = await nibssService.validateBVN(bvn);
//Save to database
    const savedCustomer = await Customer.create({
      bvn,
      identity: customerIdentity,
      status: "ONBOARDED"
    });

    return res.status(201).json({
      message: "BVN validation is successful and you have been onboarded.",
      data: savedCustomer,
    });
  } catch (error) {
    console.error(`Onboarding has failed. Reason: BVN Validation was unsuccessful. Error: ${error.message}`);

    return res.status(500).json({
      message: "BVN validation failed and onboarding was unsuccessful.",
      error: error.message,
    });
  }
};

module.exports = {
  bvnValidate,
};