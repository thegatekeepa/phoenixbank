//get balance logic
const Account = require("../register/accountModel");
const NibssService = require("../services/nibss.services");

const getAcctBalance = async (req, res) => {
  try {
    const existingAccount = await Account.findOne({
      customerId: req.user.id,
    });

    if (!existingAccount) {
      return res.status(404).json({
        message: "Account not found",
      });
    }

    const balanceResponse =
      await NibssService.getBalance(
        existingAccount.accountNumber
      );

    return res.status(200).json(balanceResponse);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { getAcctBalance }