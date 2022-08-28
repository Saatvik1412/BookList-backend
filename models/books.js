const mongoose=require('mongoose');
const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    username:{
        type:String,
    },
    author:{
        type:Array,
        required:true
    },
    uid:{
        type:String, 
        required:true
    },
    read:{
        type:String,
        required:true
    },
    sDate:{
        type: String
    },
    eDate:{
        type:String
    },
    rating:{
        type:String
    },
    thumbnail:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('Books', bookSchema)