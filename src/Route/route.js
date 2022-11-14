const express = require("express");
const router = express.Router();

const authorModel = require("../Model/authorModel");
const blogModel = require("../Model/blogModel");

router.get("/test-me", (req, res) => {
  console.log(req.body);
  res.send("Hello World!!");
});

router.post("/authors", async (req, res) => {
  try {
    const authors = await authorModel.create(req.body);
    res.status(201).json({
      status: "successful",
      authors,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail due to server error",
      error: error.message,
    });
  }
});

router.post("/blog", async (req, res) => {
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
});

router.get("/blog", async (req, res) => {
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
});

router.patch("/blog", (req, res) => {
  console.log(req.body);
  res.send("Blog-patch");
});

module.exports = router;
