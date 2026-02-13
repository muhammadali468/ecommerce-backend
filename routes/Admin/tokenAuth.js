const AdminToken = require("../../models/Admintoken");
const express = require("express");
const router = express.Router();

// http://localhost:5000/api/admin-tokenAuth
router.post("/admin-tokenAuth", async (req, res) => {
    const token = req.body.token;
    try {
        const isRequestedAdminTokenValid = await AdminToken.findOne({ token })
        return isRequestedAdminTokenValid ? res.json({ "sts": 0 }) : res.json({ "sts": 1 })
    }
    catch (error) {
        console.error(error)
    }
})

module.exports = router