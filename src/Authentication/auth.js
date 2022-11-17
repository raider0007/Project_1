const jwt = require("jsonwebtoken")



const Authentication = async function (req, res, next) {

  try {
    let token = req.headers["x-api-key"]
    if (!token) return res.status(400).send({
      status: false,
      message: "Token is mandatory"
    })

    // verify the tocken
    
    let decodedToken = jwt.verify(token, "My first Project with My freind")
    if (!decodedToken) {
      return res.status(401).send({
        status: false,
        message: "token is invalid "
      })
    }
    req.id = decodedToken.userId
    // console.log(decodedToken)

    next()
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message
    })
  }
}
module.exports.Authentication = Authentication;