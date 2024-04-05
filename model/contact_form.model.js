import { Schema, model } from "mongoose"

const contactFormSchema = new Schema({
    sender: {
        type: String,
        required: "Sender email is required"
    },
    subject: {
        type: String,
        required: "Subject is required"
    },
    message: {
        type: String,
        required: "Message is required"
    }
})

export default model("contact_form", contactFormSchema)