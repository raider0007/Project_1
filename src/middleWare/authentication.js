const authorModel = require("../Model/authorModel");
const jwt = require("jsonwebtoken");

exports.authorAuthentication = async (req, res, next) => {
  try {
    // CHECKING IF AUTHOR IS PRESENT
    const author = await authorModel.findOne(req.body);
    // IF AUTHOR PRESENT WE WILL ATTACH TOKEN IN REQ BODY AND PASS CALL TO NEXT FUNCTION
    if (author) {
      const token = await jwt.sign(req.body, "ekta_rameshwar_jivan_shankar");
      req.body.token = token;
      next();
    } else {
      return res.status(401).json({
        status: false,
        msg: "Invalid user name or password!",
      });
    }
  } catch (error) {
    res.status(500).json({
      status: false,
      error,
    });
  }
};
