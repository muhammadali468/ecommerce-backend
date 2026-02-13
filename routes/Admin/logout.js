const express = require("express");
const AdminToken = require("../../models/Admintoken");
const router = express.Router();

// http://localhost:5000/api/admin-logout
router.post("/admin-logout", async (req, res) => {
    const token = req.body.token;
    try{
        const isValidTokenRemoved = await AdminToken.findOneAndDelete({ token });
        return res.json(isValidTokenRemoved ? {sts:0, msg:"Admin Logout!"} : {sts:1, msg:"Admin Logout Failed"});
    }
    catch(error){
        console.log(error);
    }
})

module.exports = router