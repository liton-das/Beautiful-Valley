const cloudinaryUploader = require("../middlewares/Cloudinary");
const Room = require("../model/Room");
const { responseHeader } = require("../utils/responseHeader");
const { slugGenerator } = require("../utils/slugGenerator");
const cloudinary = require("cloudinary").v2;
// create room post controller
const createRoomPostController = async (req, res) => {
  const authorId = req.user._id;
  const {
    title,
    roomNumber,
    roomStatus,
    description,
    price,
    discount,
    bookingDate,
    bookingCancelDate,
  } = req.body;
  if (!title) return responseHeader.error(res, "Title field is required!", 400);
  if (!roomNumber) return responseHeader.error(res, "Room number field is required!", 400);
  if (!roomStatus) return responseHeader.error(res, "Room Status field is required!", 400);
  if (!description) return responseHeader.error(res, "Description Status field is required!", 400);
  if (!price) return responseHeader.error(res, "Price Status field is required!", 400);
  const slug = slugGenerator(title);
  const existBlog = await Room.findOne({ slug });
  if (existBlog) return responseHeader.error(res, "This blog already created!", 400);
  const finalPrice = price - price * (discount / 100);
  if (bookingDate && bookingCancelDate) {
    const start = new Date(bookingDate);
    const end = new Date(bookingCancelDate);
    if (start > end) {
      return responseHeader.error(res, "Booking cancel date must be after booking date", 400);
    }
  }
  const imageFile = req.files?.roomImage?.[0];
  const videoFile = req.files?.roomVideo?.[0];
  let imageData = "";
  let videoData = "";
  if (imageFile) {
    imageData = await cloudinaryUploader("rooms/images", "image", imageFile);
  }
  if (videoFile) {
    videoData = await cloudinaryUploader("rooms/videos", "video", videoFile);
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
    bookingDate: bookingDate ? new Date(bookingDate) : null,
    bookingCancelDate: bookingCancelDate ? new Date(bookingCancelDate) : null,
    roomImg: imageData?.url,
    roomVideo: videoData?.url,
  });
  await createRoom.save();
  return responseHeader.success(res, "Room created successfully", createRoom);
};
// edit room by admin
const editRoomByAdminController = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      roomNumber,
      roomStatus,
      description,
      price,
      discount,
      bookingDate,
      bookingCancelDate,
    } = req.body;

    const existBlog = await Room.findById(id);
    if (!existBlog) return responseHeader.error(res, "Room not found!", 404);

    if (title) {
      existBlog.title = title;
      existBlog.slug = slugGenerator(title);
    }

    if (roomNumber) existBlog.roomNumber = roomNumber;
    if (roomStatus) existBlog.roomStatus = roomStatus;
    if (description) existBlog.description = description;

    if (price) {
      const finalPrice = price - price * ((discount || existBlog.discount || 0) / 100);
      existBlog.price = price;
      existBlog.finalPrice = finalPrice;
    }

    if (discount) existBlog.discount = discount;

    if (bookingDate && bookingCancelDate) {
      const start = new Date(bookingDate);
      const end = new Date(bookingCancelDate);

      if (start > end) {
        return responseHeader.error(res, "Invalid booking date", 400);
      }

      existBlog.bookingDate = start;
      existBlog.bookingCancelDate = end;
    }

    const imageFile = req.files?.roomImage?.[0];
    const videoFile = req.files?.roomVideo?.[0];

    let imageData = null;
    let videoData = null;

    // IMAGE
    if (imageFile) {
      if (existBlog.roomImg) {
        const existImage = existBlog.roomImg.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`rooms/images`,existImage);
      }

      imageData = await cloudinaryUploader("rooms/images", "image", imageFile);
      existBlog.roomImg = imageData.url || imageData;
    }

    // VIDEO
    if (videoFile) {
      if (existBlog.roomVideo) {
        const existVideo = existBlog.roomVideo.split("/").pop().split(".")[0];
        await cloudinary.uploader.destroy(`rooms/videos`,existVideo
        );
      }

      videoData = await cloudinaryUploader("rooms/videos", "video", videoFile);
      existBlog.roomVideo = videoData.url || videoData;
    }

    await existBlog.save();

    return responseHeader.success(res, "Edit successfully", existBlog);
  } catch (e) {
    console.log(e);
    return responseHeader.error(res, "Server error", 500);
  }
};
// get-single-room (Access only admin)
 const getSingleRoomByAdminController = async () =>{
  try {
    const {id} = req.user._id
    const page = Math.parseInt(req.query.page) || 1
    const limit = Math.parseInt(req.query.limit) || 10
    const skip = (page - 1) * limit
    const totalCount = await Room.countDocuments()
    const room = await Room.find(id).sort({createdAt:1}).limit(limit).skip(skip)
    if(!room) return responseHeader.error(res,'Room not found!',404)
    const simplify = {
      room,
      pagination:{
        page,
        limit,
        skip,
        totalItems: totalCount,
        totalPages:Math.ceil(totalCount / limit)
      }
    }
    return responseHeader.success(res,'Data fetch success')
  } catch (e) {
    console.log(e)
    return responseHeader.error(res)
  }
 }

module.exports = {
  createRoomPostController,
  editRoomByAdminController,
  getSingleRoomByAdminController
};
