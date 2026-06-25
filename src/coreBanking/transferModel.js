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

    senderName: {
      type: String
    },

    receiverAccount: {
      type: String,
      required: true,
    },

    receiverName: {
      type: String
    },

    amount: {
      type: Number,
      required: true,
    },

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
