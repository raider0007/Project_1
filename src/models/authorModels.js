const mongoose = require('mongoose')
const validator = require('validator');


const authorSchema = new mongoose.Schema({
    fname: {
        type: String,
        required:[true,"fname is require"],
    },
    lname: {
        type: String,
        required:[true,"lname is require"],
    },
    title: {
        type: String,
        enum: ["Mr", "Mrs", "Miss"],
        required:[true,"plese insert valied title"],
    },
    email: {
        type: String,
        required:[true,"plese enter emaile"],
        valid_email:[true,"plese valied email"],
        unique: true,
        trim:true,  
        lowercase:true,
        validate:[validator.isEmail ,"Please provide a valid email!('foo@bar.com')"],
    },
    password: {
        type: String,
        required:[true,"password is require"],
        minlength:5,
        maxlength:9,

    },
}, {
    timestamps: true
});
module.exports = mongoose.model('author', authorSchema)