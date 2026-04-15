const User = require("../model/User")
const sendMailToUser = require("../utils/mailer")
const { otpGenerator } = require("../utils/otpGenerator")
const { emailRegex, passwordRegex } = require("../utils/regexGenerator")
const { responseHeader } = require("../utils/responseHeader")
const crypto = require('crypto');
const { accessTokenGenerator, refreshTokenGenerator, resetPasswordToken } = require("../utils/tokenGenerator")

// register user controller
const registerUserController=async(req,res)=>{
    try {
        const {fullName,email,phone,password,role,isActive}=req.body
        // check validation 
        if(!fullName) return responseHeader.error(res,'FullName field is required!',404)
        if(!emailRegex.test(email)) return responseHeader.error(res,'Invalid your email!',400)
        if(!passwordRegex.test(password)) return responseHeader.error(res,'Invalid your password')
        if(!email) return responseHeader.error(res,'Email field is required!',404)
        if(!phone) return responseHeader.error(res,'phone field is required!',404)
        if(!password) return responseHeader.error(res,'password field is required!',404)
        const existUser = await User.findOne({email})
        if(existUser) return responseHeader.error(res,'This email already exist!')
        // send otp to mail 
         const otp = otpGenerator(6)
         const user = new User({
             fullName,
             email,
             phone,
             password,
             otp,
             role,
             isActive,
             otpExpireTime:Date.now() + 10 * 60 * 1000
            })
            await user.save()
            //  otp send to user email
            sendMailToUser(email,'otp',fullName,user.otp,user.otpExpireTime)
            // ----- 
        return responseHeader.success(res,'otp send to your email')
    } catch (e) {
        console.log(e)
        return responseHeader.error(res)
    }
}
// verify otp controller 
const verifyOtpController = async(req,res)=>{
    try {
        const {email,otp} = req.body
        if(!email) return responseHeader.error(res,'Email field is required!',400)
        if(!otp) return responseHeader.error(res,'Otp field is required!',400)
        const existOtp = await User.findOne({email,otp,otpExpireTime:{$gt:Date.now()}})
        if(!existOtp) return responseHeader.error(res,'Invalid or Expire Otp!',400)
        existOtp.otp = null
        existOtp.otpExpireTime = null
        existOtp.isVerify = true
        await existOtp.save()
        return responseHeader.success(res,'Otp verify successfully',200)
    } catch (e) {
        return responseHeader.error(res)
    }
}
// resend otp controller
const resendOtpController=async(req,res)=>{
    try {
        const {email} = req.body
        if(!emailRegex.test(email)) return responseHeader.error(res,'Invalid your email!',400)
        if(!email) return responseHeader.error(res,'Email field is required!',400)
        const existUser = await User.findOne({email})
        if(!existUser) return responseHeader.error(res,'Invalid your email!',400)
        if(existUser.otp === null) return responseHeader.error(res,'You are already verifyed user',400)
        if(existUser.isVerify === true) return responseHeader.error(res,'Your otp already verifyed!',400)
        const newOtp = otpGenerator(6)
        existUser.otp = newOtp
        existUser.otpExpireTime = Date.now() + 10 * 60 * 1000
        existUser.isVerify = false
        await existUser.save()
        sendMailToUser(email,`Otp send to your this email:${email}`,existUser.fullName,newOtp,existUser.otpExpireTime)
        return responseHeader.success(res,'Resend otp successfully',200)
    } catch (e) {
        return responseHeader.error(res)
    }

}
// login controller 
const loginController = async(req,res)=>{
    try {
        const {email,password}=req.body
        if(!emailRegex.test(email)) return responseHeader.error(res,'Invalid creadintails!',400)
        if(!passwordRegex.test(password)) return responseHeader.error(res,'Invalid creadintials!',400)
        if(!email) return responseHeader.error(res,'Email field is required!',400)
        if(!password) return responseHeader.error(res,'Password field is required!',400)
        const existUser = await User.findOne({email})
        const isMatch = await existUser.verifyPassword(password)
        if(!isMatch) return responseHeader.error(res,'Invalid creadintials!',400)
        if(!existUser) return responseHeader.error(res,'Invalid creadintials!',400)
        const access_token = accessTokenGenerator(existUser._id,existUser.role,existUser.email) 
        const refresh_token = refreshTokenGenerator(existUser._id,existUser.role,existUser.email) 
        res.cookie('X-Access_Token',access_token,{
            httpOnly:true,
            sameSite:'none',
            secure:true,
        }).cookie('X-Refresh_Token',refresh_token,{
            httpOnly:true,
            sameSite:'none',
            secure:true
        })
        return responseHeader.success(res,'Login successfully',200)
    } catch (e) {
        return responseHeader.error(res)
    }
}
// get single user 
const getsingleUserController = async(req,res)=>{
    try {
        const currentUser = await User.findById(req.user._id).select('fullName email role phone isActive avatar')
        if(!currentUser) return responseHeader.error(res,'User not found!',404)
        return responseHeader.success(res,'user data fetch done',currentUser)
    } catch (e) {
        return responseHeader.error(res)
    }
}
// get all user by admin
const getAllUserByAdminController =async(req,res)=>{
    try {
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10
        const skip = (page - 1) * limit
        const totalCount = await User.countDocuments()
        const users = await User.find().sort({createdAt:-1}).skip(skip).limit(limit).select('fullName email phone avatar role isActive createdAt updatedAt')
        if(!users)return responseHeader.error(res,'Users not found!',404)
        const simplify = {
            users,
            pagination:{
                page,
                limit,
                totalItems:totalCount,
                pages:Math.ceil(totalCount / limit)
            }
        }
        return responseHeader.success(res,'Users data fetch success ',simplify)
    } catch (e) {
        return responseHeader.error(res)
    }
}
// logout controller 
const logoutController = async(req,res)=>{
    try {
        res.clearCookie('X-Access_Token')
        res.clearCookie('X-Refresh_Token')
        return responseHeader.success(res,'Logout successfully',200)
    } catch (e) {
        return responseHeader.error(res)
    }
}
// search controller 
const searchUserController =async(req,res)=>{
    try {
        const items = req.query.items
        const searchItems = await User.find({$or:[{fullName:{$regex:items,$options:'i'}}]}).select('fullName email phone role isActive avatar createdAt updatedAt')
        if(!searchItems) return responseHeader.error(res,'Search items not found!',404)
        return responseHeader.success(res,'serch items fetch success',searchItems,200)
    } catch (e) {
        return responseHeader.error(res)
    }
}
// forgot password controller 
const forgotPasswordController = async(req,res)=>{
    try {
        const {email} = req.body
        if(!email) return responseHeader.error(res,'Email field is required!',400)
        if(!emailRegex.test(email)) return responseHeader.error(res,'Invalid your email!',400)
        const existUser = await User.findOne({email})
        if(!existUser) return responseHeader.error(res,'This email not exist!',404)
        const {resetPasswordLink,hashToken} = resetPasswordToken()
        const clientUrl = `${process.env.CLIENT_URL}/reset-password/${resetPasswordLink}`
        existUser.resetPasswordToken = hashToken
        existUser.resetPasswordTokenExpireTime = Date.now() + 10 * 60 * 1000
        await existUser.save()
        sendMailToUser(email,'Reset Password Link:',existUser.fullName,clientUrl,existUser.resetPasswordTokenExpireTime)
        return responseHeader.success(res,'Reset password link send to your email','',200)
    } catch (e) {
        return responseHeader.error(res)
    }
}
// reset password controller
const resetPasswordController = async(req,res)=>{
    try {
        const {newPassword} = req.body
        const {token} = req.params
        if(!newPassword) return responseHeader.error(res,'New password token field is required!',400)
        if(!token) return responseHeader.error(res,'Token not found!',404)
        const isValidToken = crypto.createHash('sha256').update(token).digest('hex')
        const existPassword = await User.findOne({resetPasswordToken:isValidToken,resetPasswordTokenExpireTime:{$gt:Date.now()}})
        if(!existPassword) return responseHeader.error(res,'Invalid or expire token!',400)
        existPassword.password = newPassword
        existPassword.resetPasswordToken = null
        existPassword.resetPasswordTokenExpireTime = null
        await existPassword.save()
        return responseHeader.success(res,'Password reset successfully')
    } catch (e) {
        console.log(e)
        return responseHeader.error(res)
    }
}
// delete single user controller
 const deleteSingleUserController = async(req,res)=>{
    try {
        const {id} = req.params
        const existUser = await User.findOneAndDelete({_id:id})
        if(!existUser) return responseHeader.error(res,'User not found!',404)
        return responseHeader.success(res,'User deleted successfully')
    } catch (e) {
        return responseHeader.error(res)
    }
 }
module.exports = {
    registerUserController,
    verifyOtpController,
    resendOtpController,
    loginController,
    getsingleUserController,
    getAllUserByAdminController,
    logoutController,
    searchUserController,
    forgotPasswordController,
    resetPasswordController,
    deleteSingleUserController
}