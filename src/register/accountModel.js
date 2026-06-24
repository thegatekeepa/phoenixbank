const mongoose = require("mongoose");
//const bcrypt = require("bcrypt");

const accountSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true // to enforce one account per onboarded customer
    },

    bvn: {
      type: String,
      required: true,
      unique: true // to enforce one account per onboarded customer
    },

    accountNumber: {
      type: String,
      required: true,
      unique: true
    },

    accountName: {
      type: String
    },

    bankCode: {
      type: String,
      required: true
    },

    balance: {
      type: Number,
      default: 15000 // pre-fund condition
    },

    provider: {
      type: String,
      default: "NIBSS"
    },

    status: {
      type: String,
      enum: [
        "ACTIVE",
        "FROZEN",
        "CLOSED"
      ],
      default: "ACTIVE"
    }
  },
  {
    timestamps: true
  }
);

const account = mongoose.model("Account", accountSchema);
module.exports = account;
