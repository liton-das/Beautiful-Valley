const { createRoomPostController, editRoomByAdminController, getSingleRoomByAdminController, getSingleRoomBySlugController, getAllRoomsListsByAdmin, getAllRoomsLists } = require('../../controllers/roomController')
const multer = require('multer')
const { authMiddleware } = require('../../middlewares/authMiddleware')
const roleCheckMiddleware = require('../../middlewares/roleCheckMiddleware')
const upload = multer()
const roomApi = require('express').Router()
// create room api
roomApi.post('/create-room',authMiddleware,upload.fields([{name:'roomImage',maxCount:1},{name:'roomVideo',maxCount:1}]),createRoomPostController)
// edit room api
roomApi.put('/edit-room/:id',authMiddleware,roleCheckMiddleware('admin'),upload.fields([{name:'roomImage',maxCount:1},{name:'roomVideo',maxCount:1}]),editRoomByAdminController)
// get single room by admin api
roomApi.get('/get-single-room-by-admin',authMiddleware,roleCheckMiddleware('admin'),getSingleRoomByAdminController)
// get room by slug (public api)
roomApi.get('/get-room-by-slug/:slug',getSingleRoomBySlugController)
// get room lists by admin api
roomApi.get('/get-room-lists-by-admin/all',authMiddleware,roleCheckMiddleware('admin'),getAllRoomsListsByAdmin)
// get room lists by user api
roomApi.get('/get-room-lists',authMiddleware,getAllRoomsLists)


module.exports=roomApi