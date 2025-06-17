import { Router } from "express"
import {allPost,userPost,savePost} from "../Controllers/PostController.js"
import authMiddleware from "../Middlewares/authMiddleware.js"

const router = Router();

router.get("/",authMiddleware,allPost)
router.get("/postBy/:id",authMiddleware,userPost)

router.post("/",authMiddleware,savePost)


export default router
