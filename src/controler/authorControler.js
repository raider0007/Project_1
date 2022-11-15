const authorModel = require("../Model/authorModel");

exports.createAuthor = async (req, res) => {
  try {
    const authors = await authorModel.create(req.body);
    res.status(201).json({
      status: "succesful",
      data: authors,
    });
  } catch (error) {
    res.status(400).json({
      status: "fail",
      error: error.message,
    });
  }
};

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

exports.loginControler = (req, res) => {
  res.status(200).json({
    status: "login success",
    token: req.body.token,
  });
};
