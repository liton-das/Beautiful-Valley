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



module.exports ={
    createRoomPostController
}