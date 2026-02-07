const mongoose = require("mongoose");

const AddProductAttributesSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "AddProductSchema",
        required: true,
    },
    attributeName: {
        type: String,
        required: true,
    },
    attributeValue: {
        type: String,
        required: true,
    },
    attributeUnit: {
        type: String,
        required: true,
    },



})

module.exports = mongoose.model("AddProductAttributesSchema", AddProductAttributesSchema)