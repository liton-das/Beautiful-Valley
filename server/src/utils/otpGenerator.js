// otp generator
const otpGenerator = (len=6)=>{
    let result=''
    for(let i = 0 ; i < len ; i++){
        result += Math.floor(Math.random() * 10)
    }
    return result
}
module.exports = {
    otpGenerator
}
