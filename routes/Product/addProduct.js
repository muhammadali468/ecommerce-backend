require("dotenv").config()
const express = require("express");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const AddProductSchema = require("../../models/AddProduct");
const AddProductImg = require("../../models/AddProductImg");
const cloudinary = require("cloudinary").v2
const router = express.Router();

// 
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

// image storage engine setup
const proStore = multer.diskStorage({
    destination: "./products/",
    filename: function (req, file, cb) {
        const iname = shortid.generate();
        cb(null, iname + path.extname(file.originalname))
    }
})

// initialize multer

const uploadPro = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 5 }
})

const uploadImages = multer({ storage: proStore });



// http://localhost:5000/api/admin/product/uploadimages/id
router.post("/product/uploadimages/:id", uploadImages.array("images"), async (req, res) => {
    const productId = req.params.id;
    const imageFiles = req.files;

    try {
        const uploadImagesPromises = imageFiles.map((file) => {
            return cloudinary.uploader.upload_stream({ resource_type: "image" },
                async (error, result) => {
                    if (error) throw error;
                    const newProImages = new AddProductImg({
                        productId,
                        productImg: result.secure_url
                    })
                    await newProImages.save()
                }
            ).end(file.buffer)
        })
        await Promise.all(uploadImagesPromises)
        res.json({ sts: 0, msg: "Images uploaded!" })

    } catch (error) {
        console.log(error)
    }
})

// http://localhost:5000/api/product/add
router.post("/product/add", uploadPro.single("productThumbnailImg"), async (req, res) => {
    const {
        productCategory,
        productName,
        productShortDescription,
        productLongDescription,
        productPrice,
        productSalePrice,
        productSaleStartDate,
        productSaleEndDate,
    } = req.body;
    try {
        const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "products" },
                (err, result) => (err ? reject(err) : resolve(result))
            ).end(req.file.buffer);
        })
        const newProduct = new AddProductSchema({
            productCategory,
            productName,
            productShortDescription,
            productLongDescription,
            productPrice,
            productSalePrice,
            productThumbnailImg: uploadResult.secure_url,
            productSaleStartDate,
            productSaleEndDate,
        })
        await newProduct.save()
        res.json({ sts: 0, msg: "Product Added" })
    } catch (error) {
        console.log(error)
    }


})

module.exports = router