const User = require("../model/User")
const sendMailToUser = require("../utils/mailer")
const { otpGenerator } = require("../utils/otpGenerator")
const { emailRegex, passwordRegex } = require("../utils/regexGenerator")
const { responseHeader } = require("../utils/responseHeader")
const { accessTokenGenerator, refreshTokenGenerator } = require("../utils/tokenGenerator")

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

module.exports = {
    registerUserController,
    verifyOtpController,
    resendOtpController,
    loginController
}