const Transfer = require("./transferModel");

//finds by id
const getTransactionHistory = async (req, res) => {
    try {
        const myTransactions =
        await Transfer.find({
          initiatedBy: req.user.id
        }).sort({
          createdAt: -1
        });

      return res.status(200).json({
        count: myTransactions.length,
        transactions: myTransactions
      });

    } catch (error) {
        return res.status(500).json({
            message: error.message
        });
    }
  };

  //get transaction history by reference
  const seeOneTransaction = async (req, res) => {
    try {
        const singleTransaction =
        await Transfer.findOne({
          reference: req.params.reference,
          initiatedBy: req.user.id
        });

      if (!singleTransaction) {
        return res.status(404).json({
          message: "Transaction not found"
        });
      }

      return res.status(200).json({
        transaction: singleTransaction
    });

    } catch (error) {

      return res.status(500).json({
        message: error.message
      });

    }
  };

module.exports = {
    getTransactionHistory, 
    seeOneTransaction
};