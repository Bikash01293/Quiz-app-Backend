require('dotenv').config()
var nodemailer = require('nodemailer');
function sendEmail(to,otp) {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adhikaribikash821@gmail.com',
            pass: process.env.EMAILPASSWORD
        }
    });
    // var cc = ["john@gmail.com","marry@gmail.com"]
    var str = "your otp = ";
    var a =otp;
    str+=a;
    str += "\nOTP valid till 2min !"
    var mailOptions = {
        from: 'adhikaribikash821@gmail.com',
        to: to,
        // cc:cc,
        subject: 'Reset Password to Login Again !',
        text: str
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}
module.exports = sendEmail