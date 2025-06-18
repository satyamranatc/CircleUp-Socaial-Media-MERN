import { Router } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config"


const authMiddleware = (req, res, next) => {
    try {
        console.log(req.headers.authorization);
        const token = req.headers.authorization;
        const decoded = jwt.verify(token, process.env.JWT_Secret);
        console.log(decoded);
        if (!decoded) {
            return res.status(401).json({ error: "Unauthorized" });
        }
        req.user = decoded;

        next();
    } catch (error) {
        res.status(401).json({ error: "Unauthorized" });
    }
};


export default authMiddleware;