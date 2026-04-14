const jwt = require('jsonwebtoken')
const accessTokenGenerator = (_id,role,email)=>{
    return jwt.sign({
        _id,
        role,
        email
    },process.env.SECRET_TOKEN,{
        expiresIn:'1h'
    })
}
const refreshTokenGenerator=(_id,role,email)=>{
    return jwt.sign({
        _id,
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