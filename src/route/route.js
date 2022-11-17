const express = require('express');
const router = express.Router();
const author = require("../controller/authorController");
const blog = require("../controller/blogController")
const {Authentication}=require("../Authentication/auth")
const {autheraise}=require("../Authentication/authorisation")



//        <<===>><<====>     <<==Author==>>       

router.post("/authors", author.createAuthor)
router.get("/authors", author.getAuthor)

//                             <<==Blog==>>       <<===>><<===>>

router.post("/blog", blog.createBlog)
router.get("/blogs",Authentication,autheraise, blog.getBlog)

router.put("/blogis/:blogId",Authentication,autheraise,blog.updateBlog)
router.delete("/blogs/:blogId",Authentication,autheraise,blog.DELETEblogData)

router.delete("/blogs",Authentication,autheraise,blog.deleteunpublished)
router.post("/login",author.loginAuthore)






module.exports = router;    