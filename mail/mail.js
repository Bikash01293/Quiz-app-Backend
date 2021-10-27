require('dotenv').config()
const nodemailer = require('nodemailer');
function sendEmail(to,otp) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'adhikaribikash821@gmail.com',
            pass: process.env.EMAILPASSWORD
        }
    });
    // const cc = ["john@gmail.com","marry@gmail.com"]
    const str = "your otp = ";
    const a =otp;
    str+=a;
    str += "\nOTP valid till 2min !"
    const mailOptions = {
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