const express = require("express");
const router = express.Router();
const authors = require("../controller/authorController");
const blogs = require("../controller/blogController");
const { isValidAuthor } = require("../middleWare/validation");
const {
  authorAuthentication,
  authorAuthorization,
  adminAuthorization,
} = require("../middleWare/authentication");

// CREATE NEW AUTHOR API
router.post("/authors", authors.createAuthor);

// GET ALL AUTHORS FROM DATA BASE API
router.get("/authors", authors.getAllauthors);

// CREATE A NEW BLOG API AFTER VERIFYING A REGISTER AUTHOR
router.post("/blogs", isValidAuthor, blogs.createBlog);

// GET ALL BLOGS FROM DATA BASE API
router.get("/blogs", blogs.getAllBlogs);

// LOGIN IS MUST TO PERFORM BELOW UPDATE OR DELETE OPERATIONS
router.post("/login", authorAuthentication, authors.loginController);

// UPDATE A PARTICULAR BLOG AFTER AUTHORIZATION OF THE BLOGS AUTHOR
router.put("/blogs/:blogId", authorAuthorization, blogs.updateBlog);

// DELETE A PARTICULAR BLOG AFTER AUTHORIZATION OF THE BLOGS AUTHOR
router.delete("/blogs/:blogId", authorAuthorization, blogs.deleteBlog);

// DELETE MULTIPLE BLOGS BY AUTHOR, CATEGORY OR ANY TYPE IS ONLY ALLOWED TO THE ADMIN
router.delete("/blogs", adminAuthorization, blogs.deleteBlogMany);



module.exports = router;
