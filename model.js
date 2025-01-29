const mongoose=require('mongoose');
const blogSchema=mongoose.Schema({
    Title: String,
    Description: String,
    Author: String
})

const blogData=mongoose.model('blog',blogSchema);



module.exports=blogData;
