const express = require("express");
const Admin = require("../../models/Admin");
const bcrypt = require("bcryptjs");
const router = express.Router();


// http://localhost:5000/api/admin/change-password
router.put("/change-password", async (req, res) => {
    const { email, oldPassword, newPassword } = req.body;
    try {
        const validAdmin = await Admin.findOne({ adminEmail:email });
        if (!validAdmin) {
            return res.status(404).json({ sts: 1, msg: "Email not found!" });
        }
        const isMatch = await bcrypt.compare(oldPassword, validAdmin.adminPassword);
        if(!isMatch){
            res.status(401).json({sts:2,msg:"Incorrect Password!"})
        }
        const hashedPassword = await bcrypt.hash(newPassword, 12);
        validAdmin.adminPassword = hashedPassword;
        await validAdmin.save()
        return res.json({sts:0, msg:"Password updated!"});
    }
    catch (error) {
        console.log("error from backend", error)
    }
})

module.exports = router
