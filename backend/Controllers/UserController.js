import User from "../Models/UserModel.js";

export function allUser(req, res) {
    return res.json("All User")
}

export async function login(req, res) {
    let newUser = await User.findOne({ email: req.body.email });
    return res.json(newUser)
}

export async function signup(req, res) {
    let newUser = new User(req.body);
    await newUser.save();
    return res.json(newUser)
}