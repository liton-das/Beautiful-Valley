const responseHeader ={
    success:(res,message='success',data=null,statusCode=200)=>{
        return res.json({
            success:true,
            message,
            data
        }).status(statusCode)
    },
    error:(res,message='Internal server error',statusCode=500,error=true) =>{
        return res.json({
            success:false,
            message,
            error
        }).status(statusCode)
    } 
}
module.exports={
    responseHeader
}