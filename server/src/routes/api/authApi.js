const { registerUserController, verifyOtpController } = require('../../controllers/authController')

const authApi = require('express').Router()

authApi.post('/v1/register',registerUserController)
authApi.post('/v1/verify-otp',verifyOtpController)





module.exports=authApi