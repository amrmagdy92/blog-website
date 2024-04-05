import { createTransport } from "nodemailer"

const sendEmail = (emailData) => {
    return new Promise((resolve, reject) => {
        if (!typeof emailData !== "object") {
            reject({
                code: 400,
                msg: "Invalid email data"
            })
        } else {
            let transporter = createTransport({
                service: "gmail",
                auth: {
                    user: process.env.MAILER_USER,
                    pass: process.env.MAILER_PASS
                }
            })
            
            let mailOptions = {
                from: emailData.sender,
                to: process.env.MAILER_USER,
                subject: emailData.email_subject,
                text: emailData.email_body
            }
            
            transporter.sendMail(mailOptions)
            .then( info => {
                resolve({
                    code: 200,
                    msg: info.response
                })
            })
            .catch( err => {
                reject({
                    code: 500,
                    msg: err
                })
            })
        }
    })
}

export {
    sendEmail
}