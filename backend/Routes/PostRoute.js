import { Router } from "express"
import {allPost,userPost,savePost} from "../Controllers/PostController.js"

const router = Router();

router.get("/",allPost)
router.get("/postBy/:id",userPost)

router.post("/",savePost)


export default router
