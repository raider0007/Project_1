const blogModel = require("../models/blogModels");
const authorModel = require("../models/authorModels");
const jwt=require("jsonwebtoken")


//                      <<=======Phase One=====>>

//                 <<<===========Create Blog==========>>>>

const createBlog = async function (req, res) {
  try{
    let body=req.body
  const blogs = await blogModel.create(body);
  res.status(201).json({ status: "sucessfully creat blog",data: blogs,});
} catch (error) {
  res.status(400).json({status: "error",error: error.message,});
}
};

//                 <<<<==============Get blog===========>>>>>

const getBlog = async function (req, res) {
  try {
    const data = req.query;

   
      const blog = await blogModel.find(data);
      res.status(200).send({status: true, result: `${blog.length} blogs found!`,blog})
      
  } catch (error) {
    res.status(500).send({
      status: false,  
      Error: error.message
    });
  }
}

//                       <<<<=========Update Blog==========>>>>


const updateBlog = async function (req, res) {
  try {
   let blogId = req.params.blogId

    let delet=await blogModel.findOne({_id:blogId,isDeleted:false}) 
    if(!delet) return res.status(400).send({status:false,msg:"this blog is already deleated"})

  const { title, body, category, tags, subcategory } = req.body
  let time = new Date(Date.now())
      let updateBlog = await blogModel.findOneAndUpdate({ _id: blogId },{$set: {
                      title: title,
                      body: body,
                      category: category,
                        publishedAt: time,
                        isPublished: true,
                    },
                    $push: { tags: tags, subcategory: subcategory }},{ new: true })
            res.status(200).send({ status: true, msg: updateBlog })

    } catch (err) {
        res.status(500).send({ status: false, msg: err.message })
    
}}


//                  <<<<============Delete Blog============>>>>>>


const DELETEblogData = async function (req, res) {
  try {
    let data = req.params.blogId
    let savedata = await blogModel.findById(data)
    if (!savedata) return res.status(404).send({
      status: false,
      msg: "blogs not found"
    })
    console.log(savedata)
    if (savedata.isDeleted == true) return res.status(404).send({
      status: false,
      msg: "this data is alredy deleted"
    })
    await blogModel.findByIdAndUpdate(data,{$set:{isDeleted: true,
      deletedAt: new Date(Date.now())
      }},
    {
      new: true
    })
    res.status(200).send({msg:blogModel})

  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message
    })

  }
}


//                    <<<<==========Delete Query Param==========>>>>


const deleteunpublished = async function (req, res) {
  try {
    let author=req.id
    let datas = await blogModel.updateMany({$and:[{isDeleted: false,authorId:author}, req.query]}, {
      isDeleted: true,
      deletedAt: new Date(Date.now())
    },
     {new: true})
    console.log(datas)
    if (datas.modifiedCount == 0) return res.status(404).send({
      status: false,
      message: "Blogs not found with unpublished"  
    })

    return res.status(200).send({
      status: true,
      data: datas
    })

  } catch (err) {
    return res.status(500).send({
      status: false,
      error: err.message
    })
  }
}

//                        <<<<=======Phase Two======>>>>








//                  <<<<===========Exporting Modules============>>>>


    module.exports
    =
    {

  createBlog,
  getBlog,
  updateBlog,
  DELETEblogData,
  deleteunpublished
}
