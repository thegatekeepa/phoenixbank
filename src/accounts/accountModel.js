const mongoose = require("mongoose");

const accountSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer",
      required: true,
      unique: true, // to enforce one account per onboarded customer
    },
    
    bvn: {
      type: String,
      required: true,
      unique: true, // to enforce one account per onboarded customer
    },

    accountNumber: {
      type: String,
      required: true,
      unique: true,
    },

    balance: {
      type: Number,
      default: 15000, // pre-funded rule
    },

    status: {
      type: String,
      enum: ["ACTIVE", "FROZEN", "CLOSED"],
      default: "ACTIVE",
    },

    provider: {
      type: String,
      default: "NIBSS",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Account", accountSchema);