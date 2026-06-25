const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
//const { required } = require("joi");

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },

  lastName: {
    type: String,
    required: true
  },

  email: {
    type: String,
    required: true,
    unique: true
  },

  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
        validator: function (value) {
            return /^\d{11}$/.test(value);
        }, message: "Phone number must be 11 digits."
    }
  },

  bvn: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
        validator: function (value) {
            return /^\d{11}$/.test(value);
        }, 
        message: "BVN must be exactly 11 digits."
    } 
  },

  dob: {
    type: Date,
    required: true
  },

  password: {
    type: String,
    required: true,
    validate: {
        validator: function (value) {
            return /^(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{7,}$/.test(value);
        }, message: "Password must be at least 7 characters long and include uppercase, lowercase, and a special character."
    },
    select: false
  },

  identity: {
    type: Object, // stores NIBSS response
    default: {}
  },

  status: {
    type: String,
    enum: [
        "PENDING_ONBOARD", 
        "ONBOARDED", 
        "ACTIVE"],
    default: "PENDING_ONBOARD"
  }
},
{
  timestamps: true
});

//hash password before saving
customerSchema.pre(
  "save", async function () {
  if (!this.isModified('password')) return; // Only hash if password is new/changed

  const salt = await bcrypt.genSalt(10); // Generate salt
  this.password = await bcrypt.hash(this.password, salt); // Hash password
  }
);

//compare entered password with stored hash
customerSchema.methods.comparePassword = async function (inputPassword) {
  return bcrypt.compare(inputPassword, this.password);
};

const customer = mongoose.model("Customer", customerSchema);
module.exports = customer;