const mongoose = require('mongoose');


const itemSchema =new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
    },
    desc: {
        type : String,
        trim : true,
    },
    loc : {
        type : String,
    },
    date : {
        type : String
    },
    user : {
        type : mongoose.Schema.Types.ObjectId
    },
    type : {
        Type : Boolean,
    }

})

let Item = new mongoose.model('Item',itemSchema);
module.exports = Item;