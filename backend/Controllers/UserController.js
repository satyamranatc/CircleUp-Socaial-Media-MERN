import User from "../Models/UserModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Get all users (example placeholder)
export function allUser(req, res) {
    return res.json("All User");
}

// Get one users (example placeholder)
export async function  oneUser(req, res) {
    let UserData = await User.findById(req.params.id);
    console.log(UserData);
    return res.status(200).json(UserData)
}

// Login Function
export async function login(req, res) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Wrong password" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_Secret, { expiresIn: "7d" });

        return res.status(200).json({
            _id: user._id,
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}

// Signup Function
export async function signup(req, res) {
    try {
        const {fullname,username, email, password } = req.body;
     
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            fullname,
            username,
            email,
            password: hashedPassword,
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id }, process.env.JWT_Secret, { expiresIn: "7d" });

        return res.status(201).json({
            _id: newUser._id,
            token
        });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Failed to sign up user" });
    }
}


export function update(req,res)
{
    let Data = req.body;
    let Id = req.params.id;
    User.findByIdAndUpdate(Id,Data)
    .then((data) => {
        return res.status(200).json(data);
    })
    .catch((err) => {
        return res.status(500).json(err);
    })

}