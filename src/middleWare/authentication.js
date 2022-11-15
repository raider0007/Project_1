const authorModel = require("../Model/authorModel");
const jwt = require("jsonwebtoken");
const blogModel = require("../Model/blogModel");

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
  console.log(req.params);
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
    // FINDING AUTHOR ID WITH BLOG WHICH AUTHOR WANT TO ACCESS (AUTHOR ID OF AUTHOR WITH PERTICULAR BLOG)
    const blog = await blogModel
      .findById(req.params.blogId)
      .populate("authorId");
    // DECODE OF TOKEN
    const decode = await jwt.verify(token, "ekta_rameshwar_jivan_shankar");
    // REMOVING FIELD iat FROM DECODE
    delete decode.iat;
    // CHEKING EMAIL OF TOKEN WITH THE BLOG AUTHOE EMAIL
    // IF IT FALSE RETURN AUTHORISATION FAIL ERROR
    if (decode.email !== blog.authorId.email) {
      return res.status(401).json({
        status: "authorisation fail!",
        msg: "Please login whit correct id!",
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
