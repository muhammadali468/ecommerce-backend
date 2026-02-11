const express = require("express");
const Order = require("../../models/Order");
const router = express.Router();
const nodemailer = require("nodemailer");

// http://localhost:5000/api/order
router.post("/order", async (req, res) => {
    const {
        customerName,
        customerEmail,
        customerPhone,
        customerAddress,
        paymentMethod,
        products,
        totalAmount,
        deliveryType,
    } = req.body
    try {
        if (
            !customerName ||
            !customerEmail ||
            !customerPhone ||
            !customerAddress ||
            !paymentMethod ||
            products.length === 0 ||
            !totalAmount ||
            !deliveryType
        ) {
            return res.status(400).json({ sts: 1, msg: "Missing field!" })
        }
        const orderId = `ORD${Date.now().toString().slice(-6)}`
        const createOrder = new Order({
            orderId,
            customerName,
            customerEmail,
            customerPhone,
            customerAddress,
            paymentMethod,
            products,
            totalAmount,
            deliveryType,
        })
        await createOrder.save();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            }
        })
        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: customerEmail,
            subject: "Order Confirmation",
            text: `Hello ${customerName}, your order has been placed successfully!`
        
        }
        transporter.sendMail(mailOptions, (err,info)=>{
            if(err) console.log("Email error:", err);
            else console.log("Email sent:", info.response)
        })
        return res.json({ sts: 0, msg: "Order placed successfully!", orderId  })
    } catch (error) {
        console.log(error)
        return res.json({ sts: 2, msg: "Order placement failed" })
    }
})

module.exports = router