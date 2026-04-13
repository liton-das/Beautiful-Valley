const authApi = require('./api/authApi')
const router = require('express').Router()
router.use('/auth',authApi)



module.exports=router