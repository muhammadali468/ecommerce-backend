require("dotenv").config()
const express = require("express");
const AddProductSchema = require("../../models/AddProduct");
const router = express.Router();
const cloudinary = require("cloudinary").v2

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

router.delete("/product/delete/:id", async (req, res) => {
    const product = await AddProductSchema.findById(req.params.id);
    const productImg = product.productThumbnailImg;

    const parts = productImg.split("/");
    const folderAndFile = parts.slice(-2).join("/"); // folder_name/image_name.jpg
    const publicId = folderAndFile.replace(/\.[^/.]+$/, ""); // remove .jpg
    try {
        const productToBeDeleted = await AddProductSchema.findByIdAndDelete(req.params.id)
        const productImgToBeDeleted = await cloudinary.uploader.destroy(publicId);
        if (productToBeDeleted && productImgToBeDeleted) {
            res.json({ sts: 0, msg: "Product Deleted!" })
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