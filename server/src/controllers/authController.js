const User = require("../model/User")
const sendMailToUser = require("../utils/mailer")
const { otpGenerator } = require("../utils/otpGenerator")
const { responseHeader } = require("../utils/responseHeader")

// register user controller
const registerUserController=async(req,res)=>{
    try {
        const {fullName,email,phone,password,role,isActive}=req.body
        // check validation 
        if(!fullName) return responseHeader.error(res,'FullName field is required!',404)
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

module.exports = {
    registerUserController
}