const express = require("express");
const AddProductSchema = require("../../models/AddProduct");
const router = express.Router();

// http://localhost:5000/api/admin/product/update
router.post("/product/update", async (req, res) => {
    const {productIds, productStatuses} = req.body;
    try {
        await AddProductSchema.updateMany(
            {_id:{$in:productIds}},
            {$set:{productStatus:productStatuses}}
        )
        res.json({sts:0, msg:"Selected Rows updated!"})
    } catch (error) {
        console.log(error)
    }
})

module.exports = router