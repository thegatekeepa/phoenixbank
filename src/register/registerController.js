//contains all registration orchestrator logic
//const bcrypt = require("bcrypt");
const Customer = require("./customerModel");
const Account = require("./accountModel");
const NibssService = require("../services/nibss.services");

//receive customer data
const registerCustomer = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email, 
      phoneNumber,
      bvn,
      dob,
      password
    } = req.body;
    
    //check if customer exists and prevent duplicate customer
    const existingCustomer = await Customer.findOne({
      $or: [
        {bvn}, 
        {email},
        {phoneNumber}
      ]
    });

    if (existingCustomer) {
      return res.status(400).json({
        message: "Customer already exists."
      });
    }

    //requirement 1 -- bvn validation via Nibss
    const customerIdentity = await NibssService.validateBVN(bvn);
    console.log("Bvn Validated and Customer Onboarded");
    
    //requirement 2 -- create account via Nibss
    const accountResponse = await NibssService.createAccount({
      kycType: "bvn", 
      kycID: bvn, 
      dob}); 
    //const hashedPassword = await bcrypt.hash(password, 10);

    //save customer
    const savedCustomer = await Customer.create({
      firstName,
      lastName,
      email, 
      phoneNumber,
      bvn,
      dob,
      password,
      identity: 
      customerIdentity,
      status: 
      "ACTIVE"});

    //save account
    const savedAccount = await Account.create({
      customerId: savedCustomer._id, 
      bvn, 
      accountNumber: accountResponse.account.accountNumber,
      accountName: accountResponse.account.accountName,
      bankCode: accountResponse.account.bankCode,
      balance: accountResponse.account.balance, 
      status: "ACTIVE", 
      provider: "NIBSS"
    });

    return res.status(201).json({
      message: "Account created successfully.",
      customerId: savedCustomer._id,
      accountNumber: savedAccount.accountNumber,
      accountName: savedAccount.accountName
    })
  } catch (error) {
    console.log("STATUS:", error.response?.status);
    console.log("DATA:", error.response?.data);
    return res.status(500).json({
      message: error.message
    });
  };
}

module.exports = { registerCustomer };