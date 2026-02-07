const nodemailer = require("nodemailer");

// SMTP setting
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    auth: {
        user: "muhammad.akmal.bms@gmail.com",
        pass: "Akmal@123",
    },
})

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: "info@bookmystudy.pk",
        to,
        subject,
        text
    }
    try {
        const info = await transporter.sendMail(mailOptions);
    } catch (error) {

    }

}

module.exports = { sendEmail }