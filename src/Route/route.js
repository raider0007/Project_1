const express = require("express");
const router = express.Router();
const authors = require("../controler/authorControler");
const blogs = require("../controler/blogControler");
const { authorAuthentication } = require("../middleWare/authentication");

router.post("/authors", authors.createAuthor);

router.post("/blogs", blogs.createBlog);

router.get("/blogs", blogs.getAllBlogs);

router.put("/blogs/:blogId", blogs.updateBlog);

router.delete("/blogs", blogs.deleteBlogQuery);

// PHASE II

// LOGIN API BUILD MIDDLEWARE AUTHENTICATION IS ADDED
router.post("/login", authorAuthentication, authors.loginControler);

module.exports = router;
