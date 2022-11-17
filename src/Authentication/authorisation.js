const blogModels = require("../models/blogModels");



//              <<<======authorisation====>>>

const autheraise = async function (req, res, next) {

    let blogId = req.params.blogId
    if (blogId) {
        const auth = await blogModels.findById(blogId)

        if (!auth) return res.status(400).send({
            status: false,
            msg: "please provide the correct blogId"
        })

        let authorId = auth.authorId.toString()
        let authorid = req.id
        // console.log({authorId,authorid
        // })
        if (authorId != authorid) return res.status(400).send({
            status: false,
            msg: "unauthorised user"
        })
        next()
    } else {

        let blog = await blogModels.find(req.query).select({
            _id: 0,
            authorId: 1
        })
        if (blog.length == 0) return res.status(400).send({
            status: false,
            msg: "unauhorised blogs author"
        })
        let author = req.id
        let count = 0;
        for (let index = 0; index < blog.length; index++) {
            const element = blog[index];
            if (element.authorId == author) {
                count++;
            }
            if (count == 0) return res.status(400).send({
                status: false,
                msg: "unauhorised blogs author"
            })
            next()
}}
}

module.exports.autheraise = autheraise