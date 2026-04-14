const nodemailer = require("nodemailer");
const mailTemplate = require("./mailTemplate");
  // Create a transport with your SMTP server settings
  const transport = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure:false,
    auth: {
      user: "rajdas31023259@gmail.com",
      pass: "xvju rwcu cxjd qgdi"
    }
  })
// Send an email using mixed address formats
const sendMailToUser =async (userEmail,subject,user,otp,otpExpireTime)=>{
    try {
       await transport.sendMail({
      from: '"Beautiful-valley" <rajdas31023259@gmail.com>',
      to:userEmail,
      subject: subject,
      html: mailTemplate(user,otp,otpExpireTime)
    }); 
    } catch (e) {
        console.log(e)
    }
}

module.exports = sendMailToUser

