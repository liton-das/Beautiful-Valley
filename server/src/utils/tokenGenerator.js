const jwt = require('jsonwebtoken')
const accessTokenGenerator = (id,role,email)=>{
    return jwt.sign({
        _id:id,
        role,
        email
    },process.env.SECRET_TOKEN,{
        expiresIn:'1h'
    })
}
const refreshTokenGenerator=(id,role,email)=>{
    return jwt.sign({
        _id:id,
        role,
        email
    },process.env.SECRET_TOKEN,{
        expiresIn:'6h'
    })
}
module.exports={
    accessTokenGenerator,
    refreshTokenGenerator
}