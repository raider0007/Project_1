const express = require('express');
const router = express.Router();
const author = require("../controller/authorController");
const blog = require("../controller/blogController")


//---------------------- CREATE and GET Author ------------------------------------------

router.post("/authors", author.createAuthor)
router.get("/authors", author.getAuthor)

//----------------------<<<ooo>>>> ----------------------------------

router.post("/blogs1", blog.createBlog)
router.get("/blogs", blog.getBlog)


module.exports = router;