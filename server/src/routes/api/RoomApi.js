const { createRoomPostController } = require('../../controllers/roomController')
const multer = require('multer')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const upload = multer()
const roomApi = require('express').Router()
// create room api
roomApi.post('/create-room',authMiddleware,upload.fields([{name:'roomImage',maxCount:1},{name:'roomVideo',maxCount:1}]),createRoomPostController)






module.exports=roomApi