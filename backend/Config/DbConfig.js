import mongoose from "mongoose";

import "dotenv/config";



export default function DbConfig()
{
    mongoose.connect(process.env.MongoDb_URI).then(() => {
        console.log("Connected to MongoDB....")
    }).catch((err) => {
        console.log(err)
    })
}