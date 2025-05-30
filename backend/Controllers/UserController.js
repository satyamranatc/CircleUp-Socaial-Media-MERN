import User from "../Models/UserModel.js";

export function allUser(req, res) {
    return res.json("All User")
}

export async function login(req, res) {
   try
   {

     let newUser = await User.findOne({ email: req.body.email });
     if(!newUser)
     {
        return res.status(400).json({error: "User Not Found"})
     }
     return res.json(newUser)
   }
   catch(err)
   {
    return res.status(400).json({error: err})
   }
}

export async function signup(req, res) {
    let newUser = new User(req.body);
    await newUser.save();
    return res.json(newUser)
}