import { Router } from "express"
import {allUser,login,signup} from "../Controllers/UserController.js"

const router = Router();

router.get("/",allUser)
router.post("/login",login)
router.post("/signup",signup)


export default router
