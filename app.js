require('dotenv').config()
const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: true,
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS
    }
})

async function sendMessage(to) {
    try{
        const info =  await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "heitorjcastilho@gmail.com",
            subject: "test",
            text: "Functional test"
        })
    } catch(error){
        console.error(error)
    }
}

async function main(params) {
    try {
        await transporter.verify();
        console.log("Server is ready to take our messages");
    } catch (err) {
        console.error("Verification failed:", err);
    }
}
main()
sendMessage()