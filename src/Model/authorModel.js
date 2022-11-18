const mongoose = require("mongoose");
// USING VALIDATOR LIBRARY
const validator = require("validator");
const bcrypt = require("bcrypt");

const authorSchema = mongoose.Schema(
  {
    fname: {
      type: String,
      required: [true, "Please submit author first name"],
      lowerCase: true,
      trim: true,
      // WE HAVE FNAME AND LNAME SO AVOID FULL NAME AND NUMBERS IN NAME COLUMN THIS VALIDATION IS DONE
      validate: {
        validator: (name) => validator.isAlpha(name, ["en-US"]),
        message: "A first name must only contain characters without space!",
      },
    },
    lname: {
      type: String,
      required: [true, "Please submit author last name"],
      lowerCase: true,
      trim: true,
      validate: {
        // WE HAVE FNAME AND LNAME SO AVOID FULL NAME AND NUMBERS IN NAME COLUMN THIS VALIDATION IS DONE
        validator: (name) => validator.isAlpha(name, ["en-US"]),
        message: "A last name must only contain characters without space!",
      },
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
      select: false,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
    // IS ADMIN FIELD ADDED FOR SPECIAL ACCESS
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);

// BCRYPT HASH METHOD IS USED BEFORE SAVE THE USER PASSWORD IN DATA BASE TO AVOID PASSWORD LEAKAGE
authorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
});

module.exports = mongoose.model("Author", authorSchema);
