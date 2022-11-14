const express = require("express");
const router = express.Router();
const authors = require("../controler/authorControler");
const blogs = require("../controler/blogControler");
const blogModel = require("../Model/blogModel");

router.post("/authors", authors.createAuthor);

router.post("/blogs", blogs.createBlog);

router.get("/blogs", blogs.getAllBlogs);

router.put("/blogs/:blogId", blogs.updateBlog);

router.delete("/blogs/:blogId", blogs.deleteBlog);

module.exports = router;
