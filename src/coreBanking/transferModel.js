const { required } = require("joi");
const mongoose = require("mongoose");


const transferSchema = new mongoose.Schema(
  {
    reference: {
      type: String,
      unique: true,
      required: true,
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

    //type: {
      //type: String,
      //enum: ["INTRA_BANK", "INTER_BANK"],
      //default: "INTER_BANK"
    //},

    narration: {
      type: String
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
      required: true
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model(
  "Transfer", transferSchema
);
