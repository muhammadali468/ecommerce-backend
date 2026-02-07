const express = require("express");
const AddProductSchema = require("../../models/AddProduct");
const path = require("path");
const fs = require("fs")
const router = express.Router();

const productDirectory = path.join(path.resolve(__dirname, "../../", "products"));

router.delete("/product/delete/:id", async (req, res) => {
    const product = await AddProductSchema.findById(req.params.id);
    const productImg = product.productThumbnailImg;
    const filePath = path.join(productDirectory, productImg)
    try {
        const productToBeDeleted = await AddProductSchema.findByIdAndDelete(req.params.id)
        if (productToBeDeleted) {
            res.json({ sts: 0, msg: "Product Deleted!" })
            fs.unlinkSync(filePath);
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/product/delete/multiple", async (req, res) => {
    const { productIds } = req.body;
    try {
        const productsDeleted = await AddProductSchema.deleteMany({
            _id:{$in:productIds}
        })
        if(productsDeleted){
            res.json({sts:0,msg:`Total ${productsDeleted.deletedCount} products deleted!`})
        }

    } catch (error) {
        console.log(error)   
    }
})

module.exports = router