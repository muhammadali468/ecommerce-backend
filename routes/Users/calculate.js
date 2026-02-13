const express = require("express");
const router = express.Router();
const AddProductSchema = require("../../models/AddProduct")

// http://localhost:5000/api/calculateProductPrice
router.post("/calculateProductPrice", async (req, res) => {
    const { productIds } = req.body;
    if (!productIds) {
        return res.json({ sts: 1, msg: `req is undefined!` })
    }
    try {
        let validatedProducts = [];
        for (let item of productIds) {
            const product = await AddProductSchema.findById(item);
            if (!product) continue;
            let price = product.productPrice;
            if (product.productSalePrice && (product.productSaleEndDate > Date.now())) {
                price = product.productSalePrice;
            }
            console.log(price)
            validatedProducts.push({
                _id: item,
                name: product.productName,
                price,
            })
        }
        res.json({ sts: 0, msg: "Real-time product prices fetched!", products: validatedProducts })

    } catch (error) {
        console.log(error);
    }
})

module.exports = router