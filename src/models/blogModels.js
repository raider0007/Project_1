const mongoose = require('mongoose')
const objectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required:[true,"title is require"],
    },
    body: {
        type: String,
        required:[true,"body is require"],
    },
    authorId: {
        type: objectId,
        required:[true,"plese enter AuthourId"],
        ref: "authorDB",
    },
    tags: {
        type: Array
    },

    category: {
        type: String,
        required:[true,"category is require"],
    },
    subcategory: [String],

    deletedAt: Date,
    isDeleted: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    isPublished: {
      type: Boolean,
      default: false,
},
}, {timestamps: true});


module.exports = mongoose.model('blogDb', blogSchema)