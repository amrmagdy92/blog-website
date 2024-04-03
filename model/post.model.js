import mongoose from "mongoose"

const postSchema = mongoose.Schema({
    authorID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: "Author ID is required."
    },
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