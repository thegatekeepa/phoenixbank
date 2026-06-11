//main nibss contact logic to be called by the onboarding controller for bvn validation and account creation
const axios = require("axios");

const baseURL = process.env.NIBSS_BASE_URL;
const phoNibssToken = process.env.Pho_ToKEN;

const validateBVN = async (bvn) => {
  try {
    const response = await axios.post(
      `${baseURL}/api/validateBvn`,
      { bvn },
      {
        headers: {
          Authorization: `Bearer ${phoNibssToken}`,
          "Content-Type": "application/json",
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error(
      "Error validating BVN:",
      error.response?.data || error.message
    );

    throw error;
  }
};

module.exports = {
  validateBVN,
};


const createAccount = async (payload) => {
  try {
    const nibssResponse = await axios.post(
      `${baseURL}/api/account/create`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${phoNibssToken}`,
        },
      }
    );
    return nibssResponse.data;
  } catch (error) {
    console.error("Error creating account:", error.message);
    throw error; // rethrown for caller to handle
  }
};

const NibssService = {
  validateBVN,
  createAccount,
};

module.exports = NibssService;
