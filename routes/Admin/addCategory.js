const express = require("express");
const multer = require("multer");
const shortid = require("shortid");
const path = require("path");
const cloudinary = require("cloudinary").v2
// const AddCategorySchema = require("../../models/AddCategory");
const AddCategorySchema = require("../../models/AddCategory");

const router = express.Router();

cloudinary.config({
    cloud_name: "donm326ji",
    api_key: "111481265588618",
    api_secret: "5oLyoclV17XIR6nP2FMK_3QKbB0"
})


// image storage engine setup
const catStore = multer.diskStorage({
    destination: "./categories/",
    filename: function (req, file, cb) {
        const iname = shortid.generate();
        cb(null, iname + path.extname(file.originalname))
    }
})

// initialize multer

const uploadCat = multer({
    storage: catStore,
    limits: { fileSize: 1024 * 1024 * 5 }
})

// http://localhost:5000/api/category/add
router.post("/category/add", async (req, res) => {
    const cat_name = req.body.cat_name;
    const cat_file = req.file.filename;
    const cloudImg = await cloudinary.uploader.upload(cat_file, {
        folder:"categories"
    })
    const newCat = new AddCategorySchema({
        cat_name,
        cat_img:cloudImg.secure_url
    })
    console.log(newCat)
    newCat.save()
    return res.json({sts:0,msg:"Category Added!"})
})


module.exports = router