const express = require("express");
const router = express.Router();
const authors = require("../controler/authorControler");
const blogs = require("../controler/blogControler");
const {
  authorAuthentication,
  authorAuthorisation,
} = require("../middleWare/authentication");

router.post("/authors", authors.createAuthor);

router.post("/blogs", authorAuthorisation, blogs.createBlog);

router.get("/blogs", authorAuthorisation, blogs.getAllBlogs);

router.put("/blogs/:blogId", authorAuthorisation, blogs.updateBlog);

router.delete("/blogs", authorAuthorisation, blogs.deleteBlogQuery);

// PHASE II

// LOGIN API BUILD MIDDLEWARE AUTHENTICATION IS ADDED
router.post("/login", authorAuthentication, authors.loginControler);

module.exports = router;
