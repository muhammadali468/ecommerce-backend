require("dotenv").config()
const express = require("express");
const multer = require("multer");
const cloudinary = require("cloudinary").v2
const AddCategorySchema = require("../../models/AddCategory");

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})
// initialize multer

const uploadCat = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: 1024 * 1024 * 5 }
})

// http://localhost:5000/api/category/add
router.post("/category/add", uploadCat.single("cat_img"), async (req, res) => {
    const { cat_name } = req.body;
    const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
            { folder: "categories" },
            (err, result) => (err ? reject(err) : resolve(result))
        ).end(req.file.buffer);
    });

    const newCat = new AddCategorySchema({
        cat_name,
        cat_img: result.secure_url
    });

    await newCat.save();
    res.json({ sts: 0, msg: "Category Added!" });
})


module.exports = router