const blogModel = require("../Model/blogModel");
const authorModel = require("../Model/authorModel");

exports.createBlog = async (req, res) => {
  try {
    // await authorModel.findById(req.body.authorId);
    const blogs = await blogModel.create(req.body);
    res.status(201).json({
      status: true,
      data: blogs,
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      error: error.message,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await blogModel.find(req.query).populate("authorId");
    res.status(200).json({
      status: true,
      result: `${blogs.length} blogs found!`,
      blogs,
    });
  } catch (error) {
    res.status(404).json({
      status: "Not found",
      error: error.message,
    });
  }
};

exports.updateBlog = async (req, res) => {
  req.body.isPublished = true;
  req.body.publishedAt = new Date();
  try {
    const blog = await blogModel
      .find({
        _id: req.params.blogId,
        isDeleted: false,
      })
      .populate("authorId");
    //  NEED TO UPDATE
    for (const key in req.body) {
      if (key === "tags" || key === "subcategory") {
        if (!blog[0][key].includes(req.body[key])) {
          blog[0][key].push(req.body[key]);
        }
      } else {
        blog[0][key] = req.body[key];
      }
    }
    blog[0].save();
    res.status(200).json({
      status: `${blog ? "success" : `${req.params.blogId} id not found!`}`,
      data: blog,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteBlog = async (req, res) => {
  // need to add delete time
  try {
    const blogs = await blogModel.findByIdAndUpdate(
      req.params.blogId,
      {
        $set: { isDeleted: true },
      },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      result: `${blogs.title} blog deleted success!`,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};

exports.deleteBlogMany = async (req, res) => {
  try {
    const blogs = await blogModel.updateMany(
      req.query,
      { isDeleted: true },
      { new: true }
    );
    res.status(200).json({
      status: "success",
      result: `${blogs.modifiedCount} blog deleted success!`,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail",
      error,
    });
  }
};
