const jwt = require('jsonwebtoken')
const crypto = require('crypto');
// access token
const accessTokenGenerator = (_id,role,email)=>{
    return jwt.sign({
        _id,
        role,
        email
    },process.env.SECRET_TOKEN,{
        expiresIn:'1h'
    })
}
// refresh token 
const refreshTokenGenerator=(_id,role,email)=>{
    return jwt.sign({
        _id,
        role,
        email
    },process.env.SECRET_TOKEN,{
        expiresIn:'6h'
    })
}
// reset password token generator
const resetPasswordToken =()=>{
    const resetPasswordLink = crypto.randomBytes(16).toString('hex')
    const hashToken = crypto.createHash('sha256').update(resetPasswordLink).digest('hex')
    return {
        resetPasswordLink,
        hashToken
    }
}
module.exports={
    accessTokenGenerator,
    refreshTokenGenerator,
    resetPasswordToken
}