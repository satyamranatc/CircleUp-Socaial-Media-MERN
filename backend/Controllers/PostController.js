import Post from "../Models/PostModel.js";
export async function allPost(req, res) {
    let Data = await Post.find().populate("postBy", ["username", "fullName","profilePic"]);
    return res.status(200).json(Data)
}

export async function savePost(req, res) {
    let newPost = new Post(req.body);
    await newPost.save();
    return res.json(newPost)
    
    
}