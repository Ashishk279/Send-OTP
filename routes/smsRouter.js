const { Router } = require('express');
const sendSMS = require('../controllers/sendSMS')
const router = Router();

router.post('/send_otp', sendSMS.send_otp)
module.exports = router;