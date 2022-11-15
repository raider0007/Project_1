const express = require("express");
const router = express.Router();
const authors = require("../controler/authorControler");
const blogs = require("../controler/blogControler");
const {
  authorAuthentication,
  authorAuthorisation,
} = require("../middleWare/authentication");

router.post("/authors", authors.createAuthor);

router.get("/authors", authors.getAllauthors);

router.post("/blogs", authorAuthorisation, blogs.createBlog);

router.get("/blogs", blogs.getAllBlogs);

router.put("/blogs/:blogId", authorAuthorisation, blogs.updateBlog);

router.delete("/blogs/:blogId", authorAuthorisation, blogs.deleteBlogQuery);

// PHASE II

// LOGIN API BUILD MIDDLEWARE AUTHENTICATION IS ADDED
router.post("/login", authorAuthentication, authors.loginControler);

module.exports = router;
