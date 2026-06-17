//controller for balance check operation
const Account = require("./accountModel");
const NibssService = require("../services/nibss.services");

const getBalance = async (req, res) => {
  try {
  const account = await Account.findOne({
    customerId: req.user.id,
  });

  if (!account) {
    return res.status(404).json({
      message: "Account does not exist.",
    });
  }

  const balance = await NibssService.getBalance(
    account.accountNumber
  );

  res.status(200).json({
    balance: account.balance,
  });
} catch (error) {
  return res.status(500).json({
      message: error.message,
});
}

module.exports = { getBalance }
};