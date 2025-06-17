import { Router } from "express";

export const authMiddleware = (req, res, next) => {
    if (req.headers.authorization) {
        next();
    } else {
        res.status(401).json({ message: "Unauthorized" });
    }
};