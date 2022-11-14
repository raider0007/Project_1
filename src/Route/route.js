const express = require("express");
const router = express.Router();
const authors = require("../controler/authorControler");
const blogs = require("../controler/blogControler");

router.get("/test-me", (req, res) => {
  console.log(req.body);
  res.send("Hello World!!");
});

router.post("/authors", authors.createAuthor);

router.post("/blog", blogs.createBlog);

router.get("/blog", blogs.getAllBlogs);

router.patch("/blog", (req, res) => {
  console.log(req.body);
  res.send("Blog-patch");
});

module.exports = router;
