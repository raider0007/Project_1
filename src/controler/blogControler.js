const blogModel = require("../Model/blogModel");

exports.createBlog = async (req, res) => {
  try {
    const blogs = await blogModel.create(req.body);
    res.status(201).json({
      status: "successful",
      blogs,
    });
  } catch (error) {
    res.status(400).json({
      status: "invalid request",
      error,
    });
  }
};

exports.getAllBlogs = async (req, res) => {
  const { authorId, category, tags, subcategory } = req.query;
  console.log(authorId, category, tags, subcategory);
  try {
    const blogs = await blogModel
      .find({ isDeleted: false })
      .populate("authorId");
    res.status(201).json({
      status: "successful",
      result: `${blogs.length} blogs found!`,
      blogs,
    });
  } catch (error) {
    res.status(404).json({
      status: "fail due to server error",
      error,
    });
  }
};
