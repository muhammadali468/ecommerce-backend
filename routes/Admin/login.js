require("dotenv").config()
const express = require("express");
const router = express.Router();
const Admin = require("../../models/Admin")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken");
const AdminToken = require("../../models/AdminToken");
const SECRET_KEY = process.env.ADMIN_TOKEN_SECRET_KEY

// http://localhost:5000/api/admin/login
router.post("/admin/login", async (req, res) => {
    const { adminEmail, adminPassword } = req.body;
    try {
        const adminDBObject = await Admin.findOne({ adminEmail })
        if (!adminDBObject) {
            return res.json({ "sts": 1, "msg": "Email is wrong!" })
        }
        else {
            if (await bcrypt.compare(adminPassword, adminDBObject.adminPassword)) {
                const token = jwt.sign({ adminId: adminDBObject._id }, SECRET_KEY, { expiresIn: "6h" })
                const expiresAt = new Date(Date.now() + 6 * 60 * 60 * 1000)
                const adminTokenSave = new AdminToken({
                    adminId: adminDBObject._id,
                    token,
                    expiresAt
                })
                const aId = adminDBObject._id;
                const aEmail = adminDBObject.adminEmail;
                const aName = adminDBObject.adminName;
                await adminTokenSave.save()

                return res.json({ "sts": 0, "msg": "Login Successfull!", aId, aEmail, aName, token })
            }
            else {
                res.json({ "sts": 2, "msg": "Password is wrong!" })
            }
        }
    }
    catch (error) {
        res.status(500).json({ "Internal Server Error": error })
    }
})

module.exports = router