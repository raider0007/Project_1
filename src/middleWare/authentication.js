const authorModel = require("../Model/authorModel");
const jwt = require("jsonwebtoken");
const blogModel = require("../Model/blogModel");
const bcrypt = require("bcrypt");

// AUTHENTICATION OF AUTHORS LOGIN AND GENERATING A JWT TOKEN FOR EASY ACCESS
exports.authorAuthentication = async (req, res, next) => {
  try {
    // CHECKING IF AUTHOR IS PRESENT
    const author = await authorModel
      .findOne({ email: req.body.email })
      .select("+password"); // FOR SECURITY PURPOSE WE HIDE PASSWORD TO DISPLAY TO USER ALSO SO HERE SPECIALLY POP-UP PASSWORD USING +

    if (author) {
      // USING BCRYPT COMPARE METHOD TO VERIFICATION OF PASSWORD
      const passverify = await bcrypt.compare(
        req.body.password,
        author.password
      );

      // IF AUTHOR IS NOT DELETED AND SUCCESSFUL PASSWORD VERIFICATION WILL ATTACH TOKEN TO BODY AND PASS CONTROL TO NEXT FUNCTION
      if (!author.isDeleted && passverify) {
        const token = await jwt.sign(req.body, `${process.env.SEC_STRING}`);
        req.body.token = token;
        next();
      }
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

//AUTHORIZATION OF AUTHOR
exports.authorAuthorization = async (req, res, next) => {
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

    // FINDING AUTHOR ID WITH BLOG WHICH AUTHOR WANT TO ACCESS (AUTHOR ID OF AUTHOR WITH PARTICULAR BLOG)
    const blog = await blogModel
      .findById(req.params.blogId)
      .populate("authorId");

    // DECODE OF TOKEN
    const decode = await jwt.verify(token, process.env.SEC_STRING);
    // REMOVING FIELD iat FROM DECODE
    delete decode.iat;

    // CHECKING EMAIL OF TOKEN WITH THE BLOG AUTHOR EMAIL
    // IF IT FALSE RETURN AUTHORIZATION FAIL ERROR
    if (decode.email !== blog.authorId.email) {
      return res.status(401).json({
        status: "authorization fail!",
        msg: "Please login whit correct id!",
      });
    }

    // IF EVERYTHING OKAY PASSING CONTROLLER TO NEXT FUNCTION
    next();
  } catch (error) {
    res.status(401).json({
      status: "authorization fail!",
      error,
    });
  }
};

// AUTHORIZATION OF ADMIN USER TO PERFORM MULTIPLE DELETION OF ANY BLOGS
exports.adminAuthorization = async (req, res, next) => {
  try {
    const token = req.headers.authorization
      ? req.headers.authorization.split(" ")[1]
      : null;

    if (!token) {
      return res.status(404).json({
        status: "Token is not there in header found!",
        token: token,
      });
    }

    const decode = jwt.verify(token, process.env.SEC_STRING);
    const user = await authorModel.findOne({ email: decode.email });

    // IS THE USER IS NOT A ADMIN THEN RETURN WITH RESPONSE OF AUTHORIZATION FAIL
    if (!user.isAdmin) {
      return res.status(401).json({
        status: "authorization fail",
        msg: "please login with admin!",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      status: "authorization fail!",
      error,
    });
  }
};
