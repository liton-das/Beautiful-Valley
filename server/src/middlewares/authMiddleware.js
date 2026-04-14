const jwt = require('jsonwebtoken')
const { responseHeader } = require('../utils/responseHeader')
const authMiddleware = async(req,res,next)=>{
    try {
        const token = req.cookies(["X-Access_Token"]) || req.headers["authorization"].split(' ')[1]
        if(!token) return responseHeader.error(res,'Invalid token!',400)
        const verifyToken = jwt.verify(token,process.env.SECRET_TOKEN)
        if(!verifyToken) return responseHeader.error(res,'Unauthorized access token!',401)
        req.user = verifyToken
        next()
    } catch (e) {
        throw new Error("Token error",e);
        
    }
}


module.exports={
    authMiddleware
}