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
      validate: {
        validator: function (name) {
          this.fname = name.split(" ")[0];
        },
      },
    },
    lname: {
      type: String,
      required: [true, "Please submit author last name"],
      lowerCase: true,
      trim: true,
      validate: {
        validator: function (name) {
          this.lname = name.split(" ")[0];
        },
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
      minlength: 10,
      maxlength: 25,
      select: false,
    },
    confirmPassword: {
      type: String,
      require: [true, "Please enter a password"],
      select: false,
      minlength: 10,
      maxlength: 25,
      validate: {
        validator: function (el) {
          return el === this.password;
        },
        message: "Please enter a valid password!",
      },
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timeStamp: true }
);

authorSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
});

module.exports = mongoose.model("Author", authorSchema);
