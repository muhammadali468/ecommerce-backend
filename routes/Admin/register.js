const Admin = require("../../models/Admin");
const express = require("express");
const bcrypt = require("bcryptjs");
const router = express.Router();

// http://localhost:5000/api/admin-register
router.post("/admin-register", async (req, res) => {
    const { adminName, adminEmail, adminPassword } = req.body;
    try {
        const newAdmin = new Admin({
            adminName,
            adminEmail,
            adminPassword: await bcrypt.hash(adminPassword, 12) 
        })

        const saveAdmin = await newAdmin.save();
        res.status(200).json(saveAdmin);
    }
    catch (error) {
        console.log(error)
    }
})

module.exports = router