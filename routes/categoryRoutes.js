import express from "express"
import checkAuth from "../middleware/checkAuth.js"
import {
    getCategories,
    createCategory,
    updateCategory,
    deleteCategory
} from "../controllers/categoryController.js"

const router = express.Router()

// Routing
router.get('/', checkAuth, getCategories)

router.post('/create-category', checkAuth, createCategory)

router.route('/:id')
    .put(checkAuth, updateCategory)
    .delete(checkAuth, deleteCategory)

export default router