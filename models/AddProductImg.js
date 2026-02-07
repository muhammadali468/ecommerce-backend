const mongoose = require("mongoose");

const AddProductImgSchema = new mongoose.Schema({
    productId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AddProductSchema",
        required:true,
    },
    productImg:{
        type:String,
        required:true,
    },

})

module.exports = mongoose.model("AddProductImgSchema", AddProductImgSchema)