const express = require("express");
const router = express.Router();
const AddProductSchema = require("../../models/AddProduct")

// http://localhost:5000/api/calculateProductPrice
router.post("/calculateProductPrice", async (req, res) => {
    const { productIds } = req.body;
    console.log(productIds)
    if (!productIds) {
        return res.json({ sts: 1, msg: `req is undefined!` })
    }
    try {
        let validatedProducts = [];
        for (let item of productIds) {
            const product = await AddProductSchema.findById(item._id);
            if (!product) continue;
            let price = product.price;
            if (product.salePrice && (product.saleEndDate > Date.now())) {
                price = product.salePrice;
            }
            validatedProducts.push({
                _id: item._id,
                name: product.productName,
                price: product.productPrice,
            })
        }
        res.json({ sts: 0, msg: "Real-time product prices fetched!", products: validatedProducts })

    } catch (error) {
        console.log(error);
    }
})

module.exports = router