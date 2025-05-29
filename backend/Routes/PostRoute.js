import { Router } from "express"
import {allPost,savePost} from "../Controllers/PostController.js"

const router = Router();

router.get("/",allPost)
router.post("/",savePost)


export default router
