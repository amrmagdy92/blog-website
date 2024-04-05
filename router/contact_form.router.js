import { Router } from "express"
import { createContactTicket, readContactTicket } from "../controller/contact_form.controller"

const router = Router()

router.route("/")
    .post((request, response) => {
        createContactTicket(request.body.ticket)
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

router.route("/:id")
    .get((request, response) => {
        readContactTicket(request.params.id)
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