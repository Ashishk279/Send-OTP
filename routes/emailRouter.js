const { Router } = require('express');
const emailController = require("../controllers/sendemail")
const router = Router();


router.post('/sendemail', emailController.sendEmail_post)

module.exports = router;