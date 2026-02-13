require("dotenv").config()
const express = require("express");
const AddCategory = require("../../models/AddCategory");
const router = express.Router();
const cloudinary = require("cloudinary").v2


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})


// http://localhost:5000/api/admin/category/delete/id
router.delete("/category/delete/:id", async (req, res) => {
    const categoryObj = await AddCategory.findById(req.params.id)
    const categoryObjImg = categoryObj.cat_img

    const parts = categoryObjImg.split("/");
    const folderAndFile = parts.slice(-2).join("/"); // folder_name/image_name.jpg
    const publicId = folderAndFile.replace(/\.[^/.]+$/, ""); // remove .jpg
    try {
        const deleteCat = await AddCategory.findByIdAndDelete(req.params.id);
        const deleteCatImg = await cloudinary.uploader.destroy(publicId);
        if (deleteCat && deleteCatImg) {
            res.json({ sts: 0, msg: "Category Deleted!" })
        }
    } catch (error) {
        console.log(error)
    }

})

module.exports = router