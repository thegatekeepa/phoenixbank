const Account = require("../register/accountModel");
const Transfer = require("./transferModel");
const NibssService = require("../services/nibss.services");

const transferFunds = async (req, res) => {
  try {
    const {
      recipientAccountNumber,
      amount,
      narration,
      type
    } = req.body;

    // Find sender account
    const senderAccount = await Account.findOne({
      customerId: req.user.id,
    });

    if (!senderAccount) {
      return res.status(404).json({
        message: "Sender not found",
      });
    }

    // Check balance
    const liveBalance = await NibssService.getBalance(
      senderAccount.accountNumber
    );

    if (liveBalance.balance < amount) {
  return res.status(400).json({
    message: 
    `You don't have enough to transfer ${amount}, please check your account balance and try again.`
  });
}
   
    //prevent self transfer
    if (
  senderAccount.accountNumber === recipientAccountNumber
    )
    {
        return res.status(400).json({
            message: "You cannot transfer to yourself",
        });
    }


    // Name enquiry
    const fundRecipient = await NibssService.nameEnquiry(
        recipientAccountNumber
    );

    if (!fundRecipient) {
      return res.status(404).json({
        message: "Recipient verification failed",
      });
    }

    // Transfer
    const transferResponse =
      await NibssService.transferFunds({
        from: senderAccount.accountNumber,
        to: recipientAccountNumber,
        amount,
      });

    // Verify transfer success
    if (
      transferResponse.status !== "SUCCESS"
    ) {
      return res.status(400).json({
        message: "Transfer has failed",
        data: transferResponse,
      });
    }

    // Deduct balance
    //senderAccount.balance -= amount;
    await senderAccount.save();

    // Save transaction
    const transferReceipt =
      await Transfer.create({
        reference: transferResponse.reference,
        senderAccount: senderAccount.accountNumber,
        senderName: senderAccount.accountName,
        receiverAccount: recipientAccountNumber,
        receiverName: fundRecipient.accountName,
        amount,
        type,
        narration,
        status: transferResponse.status,
        initiatedBy: req.user.id,
      });

    return res.status(200).json({
      message: "Transfer successful",
      transferReceipt,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  transferFunds
};