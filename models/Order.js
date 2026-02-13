const mongoose = require("mongoose");
const OrderSchema = mongoose.Schema({
    orderId:{
        type:String,
        required:true
    },
    customerName: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerAddress: {
        type: String,
        required: true
    },
    paymentMethod: {
        type: String,
        enum: ["COD"],
        required: true
    },
    products: [
        {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "AddProductSchema",
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
                default: 1
            },
        }
    ],
    totalAmount: {
        type: Number,
        required: true,
    },
    deliveryType: {
        type: String,
        enum: ["normal", "priority"],
        required:true,
    },
    status: {
        type: String,
        default:"pending",
        enum: ["pending", "processing", "shipped", "delivered", "cancelled", "completed", "returned", "refunded", "on-hold"]
    },
}, { timestamps: true })
module.exports = mongoose.model("Order", OrderSchema)