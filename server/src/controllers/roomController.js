const cloudinaryUploader = require("../middlewares/Cloudinary")
const Room = require("../model/Room")
const { responseHeader } = require("../utils/responseHeader")
const { slugGenerator } = require("../utils/slugGenerator")

// create room post controller
const createRoomPostController=async(req,res)=>{ 
    const authorId = req.user._id
    const {title,roomNumber,roomStatus,description,price,discount,bookingDate,bookingCancelDate} = req.body
     if(!title) return responseHeader.error(res,'Title field is required!',400)
     if(!roomNumber) return responseHeader.error(res,'Room number field is required!',400)
     if(!roomStatus) return responseHeader.error(res,'Room Status field is required!',400)
     if(!description) return responseHeader.error(res,'Description Status field is required!',400)
     if(!price) return responseHeader.error(res,'Price Status field is required!',400)
     const slug = slugGenerator(title)
     const existBlog = await Room.findOne({slug})
     if(existBlog) return responseHeader.error(res,'This blog already created!',400)
     const finalPrice = price - (price * (discount / 100))
     if(bookingDate && bookingCancelDate){
        const start = new Date(bookingDate)
        const end = new Date(bookingCancelDate)
        if(start > end){
            return responseHeader.error(res,'Booking cancel date must be after booking date',400)
        }
     }
     const imageFile = req.files?.roomImage?.[0]
     const videoFile = req.files?.roomVideo?.[0]
     let imageData = '';
     let videoData = '';
     if(imageFile){
        imageData = await cloudinaryUploader('rooms/images',"image",imageFile)
     }
     if(videoFile){
        videoData = await cloudinaryUploader('rooms/videos',"video",videoFile)
     }
     const createRoom = new Room({
        title,
        slug,
        authorId,
        roomNumber,
        roomStatus,
        description,
        price,
        discount,
        finalPrice,
        bookingDate:bookingDate ? new Date(bookingDate) : null,
        bookingCancelDate:bookingCancelDate ? new Date(bookingCancelDate) : null,
        roomImg:imageData?.url,
        roomVideo:videoData?.url
     })
     await createRoom.save()
     return responseHeader.success(res,'Room created successfully',createRoom)
}
// edit room by admin
const editRoomByAdminController = async(req,res)=>{
   try {
      const {title,roomNumber,roomStatus,description,price,discount,bookingDate,bookingCancelDate} = req.body
      const existUser = await Room.findById(req.user._id)
      if(!existUser) return responseHeader.error(res,'User not found!',404)
      const slug = slugGenerator(title)
      if(title){
         existUser.title = title
         existUser.slug = slug
      }
      if(roomNumber){
         existUser.roomNumber = roomNumber
      }
      if(roomStatus){
         existUser.roomStatus = roomStatus
      }
      if(description){
         existUser.description = description
      }
      const finalPrice = price - (price * (discount / 100))
      if(price){
         existUser.price = price
         existUser.finalPrice = finalPrice
      }
      if(discount){
         existUser.discount = discount
      }
      if(bookingDate && bookingCancelDate){
         const start = new Date(bookingDate)
         const end = new Date(bookingCancelDate)
         if(start > end){
            return responseHeader.error(res,'Booking cancel must be after booking!',400)
         }
         existUser.bookingDate=start
         existUser.bookingCancelDate = end
      }
      // image edit 
      const imageFile = req.files?.roomImage[0]
      const videoFile = req.files?.roomVideo[0]
      let imageData = '';
      let videoData = '';

      if (imageFile) {
         imageData = await cloudinaryUploader('rooms/images',"image",imageFile)
      }
      if(videoFile){
         videoData = await cloudinaryUploader('rooms/videos',"video",videoFile)
      }
      existUser.roomImg = imageData
      existUser.roomVideo = videoData
      await existUser.save()
      return responseHeader.success(res,'Edit successfully')
   } catch (e) {
      console.log(e)
      return responseHeader.error(res)
   }
}


module.exports ={
    createRoomPostController,
    editRoomByAdminController
}