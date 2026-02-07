const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const AdminPasswordReset = require("../../models/AdminPasswordReset");
const Admin = require("../../models/Admin");

// http://localhost:5000/api/admin/reset-password
router.post("/admin/reset-password", async (req, res) => {
    const resetToken = req.body.resetToken;
    const password = await bcrypt.hash(req.body.password, 12);
    const isTokenValid = await AdminPasswordReset.findOne({ resetToken });
    if (!isTokenValid) {
        res.json({ sts: 1, msg: "Invalid Token!" })
    }
    else{
        const adminEmail = isTokenValid.adminEmail
        const validAdminObject = await Admin.findOneAndUpdate(
            {adminEmail:adminEmail},
            {$set:{
                adminPassword:password
            }},
            {new:true}
        );
        const deleteResetToken = await AdminPasswordReset.findOneAndDelete({resetToken})
        return res.json({sts:0,msg:"Password Updated!"})
    }

})

module.exports = router