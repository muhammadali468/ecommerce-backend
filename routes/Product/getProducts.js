const express = require("express");
const AddProductSchema = require("../../models/AddProduct");
const router = express.Router();


// http://localhost:5000/api/products/get
router.get("/products/get", async (req, res) => {
    try {
        const allProducts = await AddProductSchema.find().populate("productCategory");
        // console.log(allProducts[allProducts.length - 1].productCategory)
        if (allProducts) {
            const formatedProducts = allProducts.map((product) => {
                return {
                    _id: product._id,
                    productCategory:product.productCategory,
                    productName:product.productName,
                    productShortDescription:product.productShortDescription,
                    productLongDescription:product.productLongDescription,
                    productPrice:product.productPrice,
                    productSalePrice:product.productSalePrice,
                    productThumbnailImg:product.productThumbnailImg,
                    productSaleStartDate:product.SaleStartDate,
                    productSaleEndDate:product.productSaleEndDate,
                    productCategoryName:product.productCategory.cat_name,
                    productStatus:product.productStatus
                }
            })
            return res.json({ sts: 0, msg: "Products fetched!", product:formatedProducts })
        }
        else
            return res.json({ sts: 1, msg: "Products fetching failed!" })
    } catch (error) {
        console.log(error)
    }
})

module.exports = router