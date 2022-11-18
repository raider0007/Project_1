const authorModel = require("../Model/authorModel");

// MIDDLEWARE TO FIND A VALID AUTHOR BEFORE CREATING A NEW BLOG
exports.isValidAuthor = async (req, res, next) => {
  try {
    await authorModel.findById(req.body.authorId);
    next();
  } catch (error) {
    res.status(500).json({
      status: false,
        msg: error.message,
    });
  }
};
