 //main nibss contact logic to be called by the onboarding controller for bvn validation and account creation
const axios = require("axios");

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
    console.log("NIBSS SUCCESS RESPONSE:", response.data);
    //console.log(nibssResponse);
    return response.data.account.accountNumber;
  } 
  catch (error) {
  console.log("STATUS:", error.response?.status);
  console.log("DATA:", error.response?.data);
  throw error;
}
};


//name enquiry logic to be called by the accounts controller for verifying account details before transactions
const nameEnquiry = async (accountNumber) => {
  try {
    const response = await axios.post(
      `${process.env.NIBSS_BASE_URL}/api/account/name-enquiry/${accountNumber}`,
      { accountNumber },
      {
        headers: {
          Authorization: `Bearer ${process.env.PHO_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    throw error;
  }
};

const transferFunds = async (payload) => {
  try {
    const response = await axios.post(
      `${process.env.NIBSS_BASE_URL}/api/transfer`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${process.env.PHO_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    throw error;
  }
};

const getBalance = async (accountNumber) => {
  try {
    const response = await axios.get(
      `${process.env.NIBSS_BASE_URL}/api/account/balance/${accountNumber}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PHO_TOKEN}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    throw error;
  }
};

module.exports = {
  validateBVN,
  createAccount,
  nameEnquiry,
  transferFunds,
  getBalance,
};
