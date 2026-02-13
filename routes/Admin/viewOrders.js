const express = require("express");
const Order = require("../../models/Order");
const router = express.Router();

// http://localhost:5000/api//admin/viewOrders
router.get("/viewOrders", async(req,res)=>{
    try {
        const allOrders = await Order.find();
        console.log(allOrders)
        if(allOrders){
            return res.status(200).json({sts:0,msg:"Orders fetched successfully!", orders:allOrders});
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({sts:1, error})
    }


})

module.exports = router