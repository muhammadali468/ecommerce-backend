const mongoose = require("mongoose");

const addCategorySchema = new mongoose.Schema({
    cat_name:{
        type:String,
        require:true,
    },
    cat_img:{
        type:String,
        required:true,
    }
}, {timestamps:true});

module.exports = mongoose.model("AddCategorySchema", addCategorySchema)