const blogModel = require("../models/blogModels");
const authorModel = require("../models/authorModels");
const mongoose = require("mongoose");

const isValidObjectId = function (value) {
  //for validating object id
  return mongoose.Types.ObjectId.isValid(value);
};

// --------------------------------------- POST /blogs --------------------------------------

const createBlog = async function (req, res) {
  try {
    let blog = req.body;

    // getting the author with their Id and checking for validation
    let authorId = await authorModel.find().select({ _id: 1 });
    authorIdArr = authorId.map((obj) => {
      return obj._id.toString();
    });

    // Validating blogData
    if (!blog.body) {
      return res.status(400).send({
        status: false,
        msg: "Body is required"
      });
    }
    if (!blog.title) {
      return res.status(400).send({
        status: false,
        msg: "Title is required"
      });
    }
    if (!blog.tags) {
      return res.status(400).send({
        status: false,
        msg: "Tags is required"
      });
    }
    if (!blog.category) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "Category is required"
        });
    }
    if (!blog.authorId) {
      return res
        .status(400)
        .send({
          status: false,
          msg: "AuthorId is required"
        });
    }
    // if validation is true , create a blog
    if (blog.authorId != undefined) {
      if (authorIdArr.includes(blog.authorId)) {
        let blogCreated = await blogModel.create(blog);
        return res.status(201).send({
          data: blogCreated
        });
      }
      res.status(400).send({
        status: false,
        msg: "Author doesn't exist"
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      Error: error.message
    });
  }
};

// --------------------------------------- GET /blogs --------------------------------------

const getBlog = async function (req, res) {
  try {
    const data = req.query;

    //Validating data is empty or not
    if (Object.keys(data).length == 0) {
      const blog = await blogModel.find({
        isPublished: true,
        isDeleted: false,
      });
      if (blog.length == 0) {
        return res
          .status(404)
          .send({
            status: false,
            msg: "Blog doesn't Exists, field is required.",
          });
      }
      res.status(200).send({
        status: true,
        data: blog
      });
    }
  } catch (error) {
    res.status(500).send({
      status: false,
      Error: error.message
    });
  }
};


//-------------------------------- exporting Modules ---------------------------------------------

module.exports.createBlog = createBlog;
module.exports.getBlog = getBlog