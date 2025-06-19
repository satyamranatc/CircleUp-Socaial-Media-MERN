import { Router } from "express"
import {allUser,oneUser,login,signup,update} from "../Controllers/UserController.js"

const router = Router();

router.get("/",allUser)
router.get("/:id",oneUser)
router.post("/login",login)
router.post("/signup",signup)
router.put("/update/:id",update)


export default router
