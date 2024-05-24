require("dotenv").config();
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator');
const emailOtp = require('../models/emailOTP')

const sendEmail = async (message) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.USER,
            pass: process.env.PASS
        },
    });

    await transporter.sendMail(message, (err, info) => {
        if (err) {
            console.log('Error occurred. ' + err.message);
            return process.exit(1);
        }
        
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
    });
}
module.exports.sendEmail_post = async (req, res) => {
    try {
        const { email } = req.body;
        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
        const userOTP = await emailOtp.findOne({ email: email })
        const date = new Date();
        let message = {
            from: 'Ashish ' + process.env.USER,
            to: req.body.email,
            subject: 'OTP send to your email.',
            text: `Your OTP is ${otp}`,
        };
        console.log(message)
        if (userOTP) {
            await emailOtp.updateOne({
                otp: otp, otpExpiration: new Date(date.getTime()), upsert: true, new: true, sentDefaultOnInsert: true
            })
            await sendEmail(message);
        } else {
            await emailOtp.create({ email: email, otp: otp, otpExpiration: new Date(date.getTime()), upsert: true, new: true, sentDefaultOnInsert: true })
            await sendEmail(message)
        }
        res.status(200).json({ success: true, msg: 'OTP Send Successfully! ', userOTP: userOTP })

    } catch (err) {
        return res.status(400).json({ success: false, msg: err.message })
    }
}