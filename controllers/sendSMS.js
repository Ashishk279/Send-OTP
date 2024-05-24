const smsOTP = require('../models/smsOTP')
const otpGenerator = require('otp-generator');

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID
const authToken = process.env.TWILIO_AUTH_TOKEN
const twilio = require('twilio')(accountSid, authToken);

module.exports.send_otp = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false, lowerCaseAlphabets: false })
    const date = new Date();
    console.log(otp)
    // const userOTP = await smsOTP.findOne({ phoneNumber: phoneNumber })
    // if (userOTP) {
    //   await smsOTP.updateOne({ phoneNumber: phoneNumber, otp: otp, otpExpiration: new Date(date.getTime()), upsert: true, new: true, sentDefaultOnInsert: true })
    console.log(process.env.TWILIO_PHONE_NUMBER)
     const data =  await twilio.messages.create({
        body: `Your LifeFit verification code is: ${otp}`,
        to: phoneNumber,
        from: process.env.TWILIO_PHONE_NUMBER
      })
      console.log(data)
    // } else {
    //   await smsOTP.create({ phoneNumber: phoneNumber, otp: otp, otpExpiration: new Date(date.getTime()) })
    //   await twilio.messages.create({
    //     body: `Your OTP is: ${otp}`,
    //     to: process.env.TWILIO_PHONE_NUMBER,
    //     from: phoneNumber
    //   })
    // }
    return res.status(200).json({ success: true, msg: 'OTP Send Successfully! ', data: data})
  } catch (err) {
    return res.status(400).json({ success: false, msg: err.message })
  }
}