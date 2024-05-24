const mongoose = require("mongoose");

const smsOTP = mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    optExpiration: {
        type: Date,
        default: Date.now(),
    }
})

module.exports = mongoose.model('otp', smsOTP)

