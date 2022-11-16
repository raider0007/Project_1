const express = require('express');
const router = express.Router();
const author = require("../controller/authorController");
const blog = require("../controller/blogController")


//---------------------- CREATE and GET Author ------------------------------------------

router.post("/authors", author.createAuthor)
router.get("/authors", author.getAuthor)

//----------------------<<<ooo>>>> ----------------------------------

router.post("/blog", blog.createBlog)
router.get("/blogs", blog.getBlog)



router.put("/blogis/:blogId",blog.updateBlog)
router.delete("/blogs/:blogId",blog.DELETEblogData)
router.delete("/blogs",blog.deleteunpublished)
module.exports = router;