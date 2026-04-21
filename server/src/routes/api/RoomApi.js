const { createRoomPostController, editRoomByAdminController } = require('../../controllers/roomController')
const multer = require('multer')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const roleCheckMiddleware = require('../../middlewares/roleCheckMiddleware')
const upload = multer()
const roomApi = require('express').Router()
// create room api
roomApi.post('/create-room',authMiddleware,upload.fields([{name:'roomImage',maxCount:1},{name:'roomVideo',maxCount:1}]),createRoomPostController)
// edit room api
roomApi.put('/edit-room',authMiddleware,roleCheckMiddleware('admin'),upload.fields([{name:'roomImage',maxCount:1},{name:'roomVideo',maxCount:1}]),editRoomByAdminController)





module.exports=roomApi