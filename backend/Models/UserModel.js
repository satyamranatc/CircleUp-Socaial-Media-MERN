import mongoose from "mongoose";

let UserSchema = new mongoose.Schema({
    fullname: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "https://static-00.iconduck.com/assets.00/user-2-account-icon-2048x2046-oucjsuyg.png",
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    bio:{
        type: String,
        default: "",
    },
    postCount: {
        type: Number,
        default: 0,
    },
    // followers: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //     },
    // ],
    // following: [
    //     {
    //         type: mongoose.Schema.Types.ObjectId,
    //         ref: "User",
    //     },
    // ],
    
});

const User = mongoose.model("User", UserSchema);
export default User