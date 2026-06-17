const Account = require("../accounts/accountModel");
const Transaction = require("./model.transfer");
const nibssService = require("../services/nibss.services");

const transferFunds = async (req, res) => {
  try {
    const {
      recipientAccountNumber,
      amount,
      narration,
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
    if (senderAccount.balance < amount) {
      return res.status(400).json({
        message: "You don't have enough to send that amount. Add more money and try again.",
      });
    }
   
    //prevent self transfer
    if (
  senderAccount.accountNumber === recipientAccountNumber
    )
    {
        return res.status(400).json({
            message: "You cannot transfer to your own account",
        });
    }


    // Name enquiry
    const recipient = await nibssService.nameEnquiry(
        recipientAccountNumber
    );

    if (!recipient) {
      return res.status(404).json({
        message: "Recipient verification failed",
      });
    }

    // Transfer
    const transferResponse =
      await nibssService.transferFunds({
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
    senderAccount.balance -= amount;

    await senderAccount.save();

    // Save transaction
    const transferReceipt =
      await Transaction.create({
        transactionId: transferResponse.transactionId,
        senderAccount: senderAccount.accountNumber,
        receiverAccount: recipientAccountNumber,
        amount,
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
  transferFunds,
};