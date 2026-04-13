const { default: mongoose } = require("mongoose");
const bcrypt = require('bcryptjs')
const UserSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    },
    isActive:{
        type:String,
        enum:['active','pending','cancel'],
        default:'active'
    },
    otp:{
        type:Number,
        default:null
    },
    otpExpireTime:{
        type:Date,
        default:null
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    resetPasswordToken:{
        type:String,
        default:null
    },
    resetPasswordTokenExpireTime:{
        type:Date,
        default:null
    },
    avatar:{
        type:String,
        default:null
    }

},{timestamps:true})
// hash password 
UserSchema.pre('save',async function(){
    if(!this.isModified('password')) return 
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password,salt)
})
const User = mongoose.model('User',UserSchema)
module.exports = User
