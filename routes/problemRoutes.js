import express from "express"
import checkAuth from "../middleware/checkAuth.js"
import {
    getProblems,
    getProblem,
    createProblem,
    updateProblem,
    deleteProblem
} from "../controllers/problemController.js"

const router = express.Router()

// Routing
router.get('/', checkAuth, getProblems)

router.post('/create-problem', checkAuth, createProblem)

router.route('/:id')
    .get(checkAuth, getProblem)
    .put(checkAuth, updateProblem)
    .delete(checkAuth, deleteProblem)

export default router