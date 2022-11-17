const authorModel = require("../models/authorModels")
const jwt = require("jsonwebtoken")


const createAuthor = async function (req, res) {
  try {
    const author_data = req.body

    if (Object.keys(author_data).length == 0) {
      return res.status(400).send({
        status: false,
        msg: "Please Provide Data"
      })
    }

    let authorCreated = await authorModel.create(author_data)
    res.status(201).send({
      status: true,
      Message: "New author created successfully",
      author_data: authorCreated
    })

  } catch (error) {
    res.status(500).send({
      status: false,
      Error: error.message
    })
  }
}

// ----------------------------------------- GET AUTHOR ------------------------------------------------------------

const getAuthor = async function (req, res) {
  let alldata = await authorModel.find()
  res.status(201).send({
    status: true,
    data: alldata
  })
}

//                 <<<========Phase Two========>>>

//                <<<=========Login Author========>>>

const loginAuthore = async function (req, res) {

  let {
    emailId,
    passwor
  } = req.body
  let status = await authorModel.findOne({
    email: emailId,
    password: passwor
  })
  if (!status) return res.status(400).send({
    msg: "s"
  })

  let tockn = jwt.sign({
      authorId: status._id
    }, "My first Project with My freind"

  )
  res.status(201).send({
    tocken: tockn
  })
}

//               <<<==========Exports Module==========>>>

module.exports = {
  createAuthor,
  loginAuthore,
  getAuthor
}

//                  <<<  <<<  <<<  <<<   <<<   <<<