import express from "express"
import checkAuth from "../middleware/checkAuth.js"
import {
    getSolutions,
    createSolution,
    updateSolution,
    deleteSolution
} from "../controllers/solutionController.js"

const router = express.Router()

// Routing
router.get('/', checkAuth, getSolutions)

router.post('/create-solution', checkAuth, createSolution)

router.route('/:id')
    .put(checkAuth, updateSolution)
    .delete(checkAuth, deleteSolution)

export default router