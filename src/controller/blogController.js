const blogModel = require("../Model/blogModel");

// CREATING NEW BLOG WITH A VALID AUTHOR ID
exports.createBlog = async (req, res) => {
  try {
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

// API TO DISPLAY ALL BLOGS ALSO ADDED SOME FILTER TO DISPLAY BLOGS
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


// UPDATION OF BLOG AFTER A SUCCESSFUL AUTHORIZATION
exports.updateBlog = async (req, res) => {

  // ADDING UPDATION TIME AND PUBLISHING THE BLOG
  req.body.isPublished = true;
  req.body.publishedAt = new Date();

  try {
    // FINDING A BLOG IF IT IS NOT DELETED WITH THE BLOG ID RECEIVING BY AUTHOR IN PARAMS AND POPULATING AUTHOR DETAILS AS WELL
    const blog = await blogModel
      .findOne({
        _id: req.params.blogId,
        isDeleted: false,
      })
      .populate("authorId");
    
    // IF UPDATION IN TAGS OR SUBCATEGORY THE WE HAVE TO PUSH IF THEY ARE NOT PRESENT
    for (const key in req.body) {
      if (key === "tags" || key === "subcategory") {

        // HERE CHECKING IF THEY ARE ALREADY PRESENT USING JAVASCRIPT INCLUDES METHOD
        if (!blog[key].includes(req.body[key])) {
          blog[key].push(req.body[key]);
        }
      } else {
        // FOR OTHER FIELD SIMPLY REPLACE THE DATA
        blog[key] = req.body[key];
      }
    }
    // AFTER SUCCESSFUL UPDATION SAVING UPDATED DATA TO DATA BASE USING MONGO-DB .save METHOD
    blog.save();
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

// DELETION OF A PARTICULAR BLOG BY AUTHOR AFTER IS SUCCESSFUL AUTHORIZATION
exports.deleteBlog = async (req, res) => {
  try {
    const blogs = await blogModel.findByIdAndUpdate(
      req.params.blogId,
      {
        $set: { isDeleted: true, deletedAt: new Date() },
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

// DELETION OF MULTIPLE BLOGS BY SUCCESSFUL VERIFICATION OF ADMIN USER
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
