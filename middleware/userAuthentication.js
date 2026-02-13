require("dotenv").config()
const jwt = require("jsonwebtoken");
const UserAuthentication = (req,res,next) =>{
    const header = req.header("Authorization");
    if(!header || !header.startsWith("Bearer ")){
        return res.status(401).json({sts:1,msg:"Token Invalid!"})
    }
    else{
        const token = header.split(" ")[1]
        try {
            const verified = jwt.verify(token, process.env.USER_AUTHENTICATION_SECRET_KEY)
            next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({sts:2, msg:"Token expired!"})
        }
    }
}

module.exports = UserAuthentication