const { registerUserController } = require('../../controllers/authController')

const authApi = require('express').Router()

authApi.post('/v1/register',registerUserController)





module.exports=authApi