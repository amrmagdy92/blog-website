import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: "Post title is required."
    },
    postImage: {
        type: String,
        required: false
    },
    postText: {
        type: String,
        required: "Post text is required."
    }
})

export default mongoose.model("posts", postSchema)