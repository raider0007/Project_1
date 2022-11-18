const authorModel = require("../Model/authorModel");

// REGISTRATION OF NEW AUTHOR
exports.createAuthor = async (req, res) => {
  try {
    const authors = await authorModel.create(req.body);
    res.status(201).json({
      status: "successful",
      data: authors,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

// API TO FIND ALL AUTHORS 
exports.getAllauthors = async (req, res) => {
  try {
    const authors = await authorModel.find();
    res.status(200).json({
      status: "success",
      result: `${authors.length} authors found`,
      authors,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error,
    });
  }
};

// LOGIN API -> ALLOW AFTER SUCCESSFUL AUTHENTICATION OF USER NAME AND PASSWORD AND THEN RECEIVE A JWT TOKEN
exports.loginController = (req, res) => {
  res.status(200).json({
    status: "login success",
    token: req.body.token,
  });
};
