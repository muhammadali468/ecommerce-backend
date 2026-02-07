const jwt = require("jsonwebtoken");
const USER_SECRET_KEY = "ddf$3122tD2"

const UserAuthentication = (req,res,next) =>{
    const header = req.header("Authorization");
    if(!header || !header.startsWith("Bearer ")){
        res.json({sts:1,msg:"Token Invalid"})
    }
    else{
        const token = header.split(" ")[1]
        try {
            const verified = jwt.verify(token, USER_SECRET_KEY)
            req.user = verified
            console.log(user)
            next()
        } catch (error) {
            console.log(error)
        }
    }

}



module.exports = UserAuthentication