const mongoose = require("mongoose");

const AddProductSchema = new mongoose.Schema({
    productCategory:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"AddCategorySchema",
        required:true,
    },
    productName:{
        type:String,
        required:true,
    },
    productShortDescription:{
        type:String,
        required:true,
    },
    productLongDescription:{
        type:String,
        required:true,
    },
    productThumbnailImg:{
        type:String,
        required:true,
    },
    productPrice:{
        type:Number,
        required:true,
    },
    productSalePrice:{
        type:Number,
        required:true,
    },
    productSaleStartDate:{
        type:Date,
        required:true,
    },
    productSaleEndDate:{
        type:Date,
        required:true,
    },
    productStatus:{
        type:String,
        enum:["pending","enable","disable"],
        default:"pending",
        required:true,
    },

})

AddProductSchema.pre("find", function(next){
    this.populate("productCategory")
})

module.exports = mongoose.model("AddProductSchema", AddProductSchema)