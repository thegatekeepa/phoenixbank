const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema(
  {
    transactionId: {
      type: String,
      unique: true,
      required: true,
      //sparse: true,
    },

    senderAccount: {
      type: String,
      required: true,
    },

    receiverAccount: {
      type: String,
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    type: {
      type: String,
      enum: ["INTRA_BANK", "INTER_BANK"],
      //default: "INTER_BANK",
      required: true,
    },

    narration: {
      type: String,
    },

    status: {
      type: String,
      enum: ["PENDING", "SUCCESS", "FAILED"],
      default: "PENDING",
    },

    bankCode: { 
      type: String,
    },

    initiatedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Transaction", transferSchema
);
