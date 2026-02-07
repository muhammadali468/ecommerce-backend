const express = require("express");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const AddProductSchema = require("../../models/AddProduct");
const AddProductImg = require("../../models/AddProductImg");

const router = express.Router();

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
    storage: proStore,
    limits: { fileSize: 1024 * 1024 * 5 }
})

const uploadImages = multer({storage:proStore});

// http://localhost:5000/api/product/uploadimages/id
router.post("/product/uploadimages/:id", uploadImages.array("images"),async(req,res)=>{
    const productId = req.params.id;
    const imageFiles = req.files;

    try {
        const imagePromises = imageFiles.map((file)=>{
            const newProImages = new AddProductImg({
                productId,
                productImg:file.filename
            })
            return newProImages.save()
        })
        await Promise.all(imagePromises)
        res.json({sts:0,msg:"Images uploaded!"})
        
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
    const productThumbnailImg = req.file.filename;
    try {
        const newProduct = new AddProductSchema({
            productCategory,
            productName,
            productShortDescription,
            productLongDescription,
            productPrice,
            productSalePrice,
            productThumbnailImg,
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