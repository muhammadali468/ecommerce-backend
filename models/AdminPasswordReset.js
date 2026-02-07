const mongoose = require("mongoose");

const adminPasswordResetScheme = new mongoose.Schema({
    adminEmail: {
        type: String,
        require: true,
    },
    resetToken: {
        type: String,
        require: true,
    },
    expiresAt: {
        type: Date,
        require: true,
    },
}, { timestamps: true })

adminPasswordResetScheme.index({expiresAt:1},{expireAfterSeconds:0});

module.exports = mongoose.model("adminPasswordResetScheme", adminPasswordResetScheme)