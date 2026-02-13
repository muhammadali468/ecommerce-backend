require("dotenv").config()
const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");
const ADMIN_TOKEN_SECRET_KEY = process.env.ADMIN_TOKEN_SECRET_KEY
const AdminAuthentication = async (req, res, next) => {
    const header = req.header("x-admin-token");
    if (!header || !header.startsWith("Bearer ")) {
        return res.status(401).json({ sts: 1, msg: "Token Invalid!" })
    }
    else {
        const token = header.split(" ")[1]
        try {
            const decoded = jwt.verify(token, ADMIN_TOKEN_SECRET_KEY)
            const admin = await Admin.findById(decoded.adminId);
            req.admin = admin
            if (!admin) {
                return res.status(403).json({ sts: 1, msg: "User is not Admin!" });
            }
            next()
        } catch (error) {
            console.log(error)
            return res.status(401).json({ sts: 1, msg: "Invalid or expired token!" });

        }
    }
}
module.exports = AdminAuthentication