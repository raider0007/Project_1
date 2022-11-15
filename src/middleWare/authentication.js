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

exports.authorAuthorisation = async (req, res, next) => {
  try {
    // EXTRACTING TOKEN FROM HEADERS
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;
    // IF TOKEN IS NULL THEN RETURNING RESPONSE
    if (!token) {
      return res.status(404).json({
        status: "Token is not there in header found!",
        token: token,
      });
    }
    // IF TOKEN IS THERE THEN CHEKING IS IT A VALID OR NOT

    // DECODE OF TOKEN
    const decode = await jwt.verify(token, "ekta_rameshwar_jivan_shankar");
    // REMOVING FIELD iat FROM DECODE
    delete decode.iat;
    // FINDING USER WITH THIS DECODE
    const user = await authorModel.findOne(decode);
    // IF USER NOT FOUND SENDING RESPONSE WITH ERROR CODE
    if (!user) {
      return res.status(401).json({
        status: "authorisation fail!",
        error,
      });
    }
    // IF EVERYTHING OKAY PASSING CONTROLE TO NEXT FUNCTION
    next();
  } catch (error) {
    res.status(401).json({
      status: "authorisation fail!",
      error,
    });
  }
};
