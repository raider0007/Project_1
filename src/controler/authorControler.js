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
      error,
    });
  }
};
