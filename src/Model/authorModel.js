const mongoose = require("mongoose");
// USING VALIDATOR LIBRARY
const validator = require("validator");

const authorSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Please submit author first name"],
      lowerCase: true,
      trim: true,
    },
    lname: {
      type: String,
      required: [true, "Please submit author last name"],
      lowerCase: true,
      trim: true,
    },
    title: {
      type: String,
      enum: ["Mr", "Mrs", "Miss"],
      required: [true, "Please enter title for name"],
    },
    email: {
      type: String,
      unique: [true, "Email id already exists"],
      required: [true, "Please enter your mail id!"],
      lowercase: true,
      trim: true,
      // VALIDATION OF EMAIL USING VALIDATOR LIB
      validate: [validator.isEmail, "Please provide a valid email!"],
    },
    password: {
      type: String,
      require: [true, "Please enter a password"],
      minlength: 10,
      maxlength: 25,
    },
  },
  { timeStamp: true }
);

module.exports = mongoose.model("Author", authorSchema);
