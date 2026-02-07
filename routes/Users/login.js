const express = require("express");
const User = require("../../models/User/user");
const bcrypt = require("bcryptjs");
const router = express.Router();
const jwt = require("jsonwebtoken");
const UserAuthentication = require("../../middleware/userAuthentication");
const USER_SECRET_KEY = "ddf$3122tD2"
// http://localhost:5000/api/user/login
router.post("/user/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ sts: 1, msg: "Please fill all fields!" });
        }
        const validUser = await User.findOne({ email })
        if (!validUser) {
            return res.json({ sts: 2, msg: "Email doesn't exist!" });
        }
        const correctPassword = await bcrypt.compare(password, validUser.password);
        if (!correctPassword) {
            return res.json({ sts: 3, msg: "Incorrect Password" });
        }
        const token = jwt.sign({ id: validUser._id }, USER_SECRET_KEY, { expiresIn: "6h" })
        res.json({ "token": token, sts: 0, msg: "User Login!" })

    } catch (error) {
        console.log(error)
    }
})

// middleware testing
router.get("/testauth", UserAuthentication, async(req,res)=>{
    res.json({msg:"Middleware is working"})
})


module.exports = router