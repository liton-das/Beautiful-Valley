const { registerUserController, verifyOtpController, resendOtpController } = require('../../controllers/authController')

const authApi = require('express').Router()

authApi.post('/v1/register',registerUserController)
authApi.post('/v1/verify-otp',verifyOtpController)
authApi.post('/v1/resend-otp',resendOtpController)





module.exports=authApi