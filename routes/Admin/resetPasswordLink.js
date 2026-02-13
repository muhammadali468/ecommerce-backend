const express = require("express");
const Admin = require("../../models/Admin");
const { sendEmail } = require("../../common-snips/emailSender");
const AdminPasswordReset = require("../../models/AdminPasswordReset");
const router = express.Router();

// http://localhost:5000/api/admin/reset-password-link
router.post("/reset-password-link", async (req, res) => {
    const adminEmail = req.body.adminEmail;
    try {
        const isValidEmail = await Admin.findOne({ adminEmail });
        if (!isValidEmail) {
            return res.json({ sts: 1, msg: "Email not found!" })
        }
        const subject = "Reset Password Link";
        // generate random 6 digits OTP
        const resetToken = Math.floor(100000 + Math.random() * 900000);
        const expiresAt = new Date(Date.now() + 60 * 60 * 1000);
        const text = `Your reset password link is : http://localhost:5173/admin/reset-password-link/${resetToken}`;
        const saveResetToken = new AdminPasswordReset({
            adminEmail,
            resetToken,
            expiresAt
        })
        const result = await saveResetToken.save()
        console.log(result, text)
        // console.log(text)
        sendEmail(email, subject, resetToken);
        return res.json({ sts: 0, msg: "Your reset link has been sent", text})
    } catch (error) {

    }
})

module.exports = router