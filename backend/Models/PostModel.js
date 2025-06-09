import mongoose from "mongoose";

let LikeSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
})

let CommentSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    comment: {
        type: String,
        required: true,
    },
})

let PostSchema = new mongoose.Schema({

    PostImage:{
        type: String,
        required: true,
    },
    caption: {
        type: String,
        default: "",
    },
    postBy:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    likes: {
        type: [LikeSchema],
        default: [],
    },
    comments: {
        type: [CommentSchema],
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.model("Post", PostSchema);