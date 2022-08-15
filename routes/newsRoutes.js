import express from "express"
import checkAuth from "../middleware/checkAuth.js"
import {
    getNews,
    createNews,
    updateNews,
    deleteNews
} from "../controllers/newsController.js"

const router = express.Router()

// Routing
router.get('/', checkAuth, getNews)

router.post('/create-news', checkAuth, createNews)

router.route('/:id')
    .put(checkAuth, updateNews)
    .delete(checkAuth, deleteNews)

export default router