const express = require("express");
const AddCategory = require("../../models/AddCategory");
const router = express.Router();

// http://localhost:5000/api/category/viewAll
router.get("/category/viewAll", async(req,res)=>{
    try {
        const getAllCat = await AddCategory.find();
        
        res.json({sts:0,msg:"All categories fetched!","cat":getAllCat});

    } catch (error) {
        console.log(error)
    }
})

module.exports = router;
