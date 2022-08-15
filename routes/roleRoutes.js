import express from "express"
import checkAuth from "../middleware/checkAuth.js"
import {
    createRole
} from "../controllers/roleController.js"

const router = express.Router()

// Routing
router.post('/create-role', checkAuth, createRole)

export default router