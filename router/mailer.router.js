import { Router } from "express"
import { sendEmail } from "../controller/mailer.controller"

const router = Router()

router.route("/")
    .post((request, response) => {
        sendEmail(request.body.emailData)
        .then(result => {
            let responseCode = result.code
            let resultData = result.msg
            response.status(responseCode).json({ msg: resultData })
        })
        .catch(err => {
            let responseCode = err.code
            let resultData = err.msg
            response.status(responseCode).json({ msg: resultData })
        })
    })

export default router