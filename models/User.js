const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
    },
    password : {
        type  : String,
        required : true,
        trim : true,
    },
    lostItems : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'LostItem'
        }
    ],
    foundItems : [
        {
            type : mongoose.Schema.Types.ObjectId,
            ref : 'FoundItem'
        }
    ]

})


let User = new mongoose.model('User',userSchema);
module.exports = User;