import express from "express"
import cors from "cors"
import "dotenv/config"

import useRoutes from "./Routes/UseRoute.js";
import postRoutes from "./Routes/PostRoute.js";

import DbConfig from "./Config/DbConfig.js"

const app = express();

app.use(cors());
app.use(express.json());

DbConfig();


app.get("/", (req, res) => {
    res.json("Hello from server")
})

app.use("/api/users", useRoutes);
app.use("/api/posts/", postRoutes);



app.listen(process.env.PORT || 5500, () => {
    console.log(`Server is running on port ${process.env.PORT || 5500}`)
})