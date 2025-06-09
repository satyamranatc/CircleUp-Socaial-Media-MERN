import Post from "../Models/PostModel.js";
import User from "../Models/UserModel.js";
export async function allPost(req, res) {
    let Data = await Post.find().populate("postBy", ["username", "fullName","profilePic"]);

    return res.status(200).json(Data)
}

export async function userPost(req, res) {
    let Data = await Post.find({postBy: req.params.id}).populate("postBy", ["username", "fullName","profilePic"]);
    return res.status(200).json(Data)
}

export async function savePost(req, res) {
    let newPost = new Post(req.body);
    // Update Post Count:
   
    let user = await User.findById(newPost.postBy);
    console.log(user.postCount);
    user.postCount = user.postCount + 1;
    await user.save();

    await newPost.save();
    return res.json(newPost)
    
    
}