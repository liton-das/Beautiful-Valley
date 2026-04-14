const { responseHeader } = require("../utils/responseHeader")

const roleCheckMiddleware = (...roles)=>{
    return (req,res,next)=>{
        try {
            if(roles.includes(req.user.role)){
                return next()
            }
            return responseHeader.error(res,'Access Denide',403)
        } catch (e) {
            return responseHeader.error(res,'Access Denide!',403)
        }
    }
}
module.exports = roleCheckMiddleware