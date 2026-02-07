const express = require("express");
const AddCategory = require("../../models/AddCategory");

const router = express.Router();
const fs = require("fs");
const path = require("path");


const categoryDirectory = path.join(path.resolve(__dirname, "../../", "categories"))

// http://localhost:5000/api/category/delete/id
router.delete("/category/delete/:id", async (req, res) => {
    const categoryObj = await AddCategory.findById(req.params.id)
    const categoryObjImg = categoryObj.cat_img
    const filePath = path.join(categoryDirectory,categoryObjImg)
    try {

        const deleteCat = await AddCategory.findByIdAndDelete(req.params.id);
        if (deleteCat) {
            res.json({ sts: 0, msg: "Category Deleted!" })
            fs.unlinkSync(filePath)
        }
    } catch (error) {
        console.log(error)
    }

})

module.exports = router