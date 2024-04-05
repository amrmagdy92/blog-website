import { isValidObjectId } from "mongoose"
import contactFormModel from "../model/contact_form.model"

const createContactTicket = (ticketData) => {
    return new Promise((resolve, reject) => {
        if (typeof ticketData !== "object") {
            return reject({
                code: 400,
                msg: "Invalid ticket data"
            })
        } else {
            contactFormModel.create({
                sender: ticketData.sender,
                subject: ticketData.subject,
                message: ticketData.message
            }).then( ticket => {
                if (ticket) {
                    resolve({
                        code: 200,
                        msg: ticket
                    })
                } else {
                    reject({
                        code: 500,
                        msg: "Message was not sent"
                    })
                }
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
const readContactTicket = (ticketID) => {
    return new Promise((resolve, reject) => {
        if (!isValidObjectId(ticketID)) {
            reject({
                code: 400,
                msg: "Invalid ticket"
            })
        } else {
            contactFormModel.findById(ticketID)
            .then( ticket => {
                if (ticket) {
                    resolve({
                        code: 200,
                        msg: ticket
                    })
                } else {
                    reject({
                        code: 404,
                        msg: "Ticket not found"
                    })
                }
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

export { createContactTicket, readContactTicket }