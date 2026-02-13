const express = require("express");
const User = require("../../models/User/user");
const bcrypt = require("bcryptjs")
const router = express.Router();

// http://localhost:5000/api/user/register
router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body
        if (!name || !email || !password) {
            return res.json({ sts: 1, msg: "Please fill all fields." })
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.json({ sts: 2, msg: "Email already registered." })
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const registerUser = await User.create({
            name,
            email,
            password: hashedPassword
        })
        if(registerUser){
            return res.json({ sts: 0, msg: "User registered!", name, email })
        }
    } catch (error) {
        console.log(error)
    }
})


module.exports = router