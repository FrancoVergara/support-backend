import express from "express"
import checkAuth from "../middleware/checkAuth.js"
import {
    createUser,
    logIn,
    getUser
} from "../controllers/userController.js"

const router = express.Router()

// User routing
router.post('/login', logIn)
router.post('/create-user', createUser)
router.get('/user', checkAuth, getUser)

export default router