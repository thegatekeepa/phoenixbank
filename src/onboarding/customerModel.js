const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      trim: true,
    },

    lastName: {
      type: String,
      trim: true,
    },

    email: {
      type: String,
      trim: true,
      lowercase: true,
    },

    dob: {
        type: Date,
    },

    phoneNumber: {
      type: String,
      trim: true,
    },

    bvn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    identity: {
      type: Object, // stores NIBSS response (flexible since API shape may vary)
      default: {},
    },

    status: {
      type: String,
      enum: ["PENDING_ONBOARD", "ONBOARDED", "ACTIVE"],
      default: "PENDING_ONBOARD",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Customer", customerSchema);