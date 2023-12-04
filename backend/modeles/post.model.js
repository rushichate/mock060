const mongoose = require("mongoose")

const postSchema = mongoose.Schema({
     name:{type:String,required:true},
     description:{type:String,required:true},
     category:{type:String,required:true},
     image:{type:String,required:true},
     location:{type:String,required:true},
     date:{type:Date,default:Date.now},
     price:{type:Number,required:true}
},{
    versionKey:false
})

const PostModel = mongoose.model("post",postSchema)

module.exports = {
    PostModel
}