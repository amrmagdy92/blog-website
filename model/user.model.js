import { Schema, model } from "mongoose"

const userSchema = new Schema({
    firstName: {
        type: String,
        required: "First name is required"
    },
    lastName: {
        type: String,
        required: "Last name is required"
    },
    email: {
        type: String,
        validator: () => {
            return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(this.email)
        },
        unique: "This email has been registered already"
    },
    hashedPassword: {
        type: String,
        required: "Password is required"
    },
    userSalt: {
        type: Number,
        required: "Salt is required"
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    updatedAt: {
        type: Date
    }
})

export default model("users", userSchema)