//controller for balance check operation
const Account = require("../accounts/accountModel");

const getBalance = async (req, res) => {
  const account = await Account.findOne({
    customer: req.user.id,
  });

  if (!account) {
    return res.status(404).json({
      message: "Account does not exist.",
    });
  }

  res.status(200).json({
    balance: account.balance,
  });
};

module.exports = { getBalance };