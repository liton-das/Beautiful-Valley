const { registerUserController, verifyOtpController, resendOtpController, loginController, getsingleUserController } = require('../../controllers/authController')
const { authMiddleware } = require('../../middlewares/authMiddleware')

const authApi = require('express').Router()

authApi.post('/v1/register',registerUserController)
authApi.post('/v1/verify-otp',verifyOtpController)
authApi.post('/v1/resend-otp',resendOtpController)
authApi.post('/v1/login',loginController)
authApi.get('/v1/get-single-user',authMiddleware,getsingleUserController)





module.exports=authApi