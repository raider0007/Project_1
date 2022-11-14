const authorModel = require("../Model/authorModel");

exports.createAuthor = async (req, res) => {
    console.log(req.body);
  try {
    const authors = await authorModel.create(req.body);
    res.status(201).json({
      status: "successful",
      authors,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail due to server error",
      error: error.message,
    });
  }
};
