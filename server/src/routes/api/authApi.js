const { registerUserController, verifyOtpController, resendOtpController, loginController } = require('../../controllers/authController')

const authApi = require('express').Router()

authApi.post('/v1/register',registerUserController)
authApi.post('/v1/verify-otp',verifyOtpController)
authApi.post('/v1/resend-otp',resendOtpController)
authApi.post('/v1/login',loginController)





module.exports=authApi