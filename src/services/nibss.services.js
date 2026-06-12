//main nibss contact logic to be called by the onboarding controller for bvn validation and account creation
const axios = require("axios");

//const baseURL = process.env.NIBSS_BASE_URL;
//const NibssToken = process.env.PHO_TOKEN;

const validateBVN = async (bvn) => {
  try {
    const response = await axios.post(
      `${process.env.NIBSS_BASE_URL}/api/validateBvn`,
      { bvn },
      {
        headers: {
          Authorization: `Bearer ${process.env.PHO_TOKEN}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error validating BVN:", error.message);
    throw error; // rethrow the error for the caller to handle
  }
};

//account creation logic to be called by the onboarding controller for account creation after bvn validation
const createAccount = async (customerData) => {
  try {
    const payload = {
      kycType: customerData.kycType,
      kycID: customerData.kycID,
      dob: customerData.dob,
    };

    console.log("PAYLOAD TO NIBSS:", payload);

    const response = await axios.post(
      `${process.env.NIBSS_BASE_URL}/api/account/create`, 
      payload,
      {headers: {
          Authorization: `Bearer ${process.env.PHO_TOKEN}`,
          "Content-Type": "application/json",
        },
      },
    );
    
    return response.data;
  } 
  catch (error) {
  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
  throw error;
}
};

module.exports = {
  validateBVN,
  createAccount
};
