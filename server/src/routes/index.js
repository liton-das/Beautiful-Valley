const router = require('express').Router()
const authApi = require('./api/authApi')
const roomApi = require('./api/RoomApi')
router.use('/auth',authApi)
// room api
router.use('/blog/v1',roomApi)


module.exports=router