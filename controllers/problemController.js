import Category from "../models/categoryModel.js";
import Problem from "../models/problemModel.js";
import Solution from "../models/solutionModel.js";

const getProblems = async (req, res) => {
    try {
        // Get problems
        const problems = await Problem.find({}).select("-createdAt -updatedAt -__v")
        res.json(problems)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const getProblem = async (req, res) => {

    const { id } = req.params

    try {
        // Check if problem exists
        const problem = await Problem.findById({ _id: id })
            .select("-createdAt -updatedAt -__v -category")
            .populate({
                path: "solutions",
                select: "-createdAt -updatedAt -__v -problem"
            })

        if(!problem) {
            const error = new Error('El error no existe')
            return res.status(400).json({ message: error.message })
        } 

        res.json(problem)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const createProblem = async (req, res) => {

    const { category } = req.body

    // Check if category exist
    const categoryExist = await Category.findById({ _id: category })

    if (!categoryExist) {
        const error = new Error('La categoria asignada no existe')
        return res.status(400).json({ message: error.message })
    }

    try {
        // Create problem
        const problem = Problem(req.body)
        await problem.save()

        // Add problem to category ref
        categoryExist.problems.push(problem._id)
        await categoryExist.save()

        res.json(problem)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const updateProblem = async (req, res) => {

    const { id } = req.params
    const { name, description } = req.body

    // Check if user is admin
    if (req.user.role.role.toString().toLowerCase() !== 'admin') {
        const error = new Error('Debes ser admin para poder realizar esta accion')
        return res.status(403).json({ message: error.message })
    }

    // Check if problem exist
    const problem = await Problem.findById({ _id: id })

    if (!problem) {
        const error = new Error('El error no existe')
        return res.status(400).json({ message: error.message })
    }

    // Update problem - save new parameter if exist
    problem.name = name || problem.name
    problem.description = description || problem.description

    try {
        // Save problem
        await problem.save()
        res.json(problem)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const deleteProblem = async (req, res) => {

    const { id } = req.params

    // Check if user is admin
    if (req.user.role.role.toString().toLowerCase() !== 'admin') {
        const error = new Error('Debes ser admin para poder realizar esta accion')
        return res.status(403).json({ message: error.message })
    }

    // Check if problem exist
    const problem = await Problem.findById({ _id: id })

    if (!problem) {
        const error = new Error('El error no existe')
        return res.status(400).json({ message: error.message })
    }

    // Check if category exist
    const category = await Category.findById({ _id: problem.category })

    if(!category) {
        const error = new Error('La categoria a la que hace referencia, no existe')
        return res.status(400).json({ message: error.message })
    }

    try {
        // Delete solution and ref of the problem
        problem.solutions?.map(async solution => {
            problem.solutions.pull(solution)
            await Solution.findByIdAndDelete({ _id: solution })
        })
        await problem.save()

        // Delete ref in categories
        category.problems.pull(problem._id)
        await category.save()

        // Delete problem
        await Problem.findByIdAndDelete({ _id: id })
        res.json({ message: 'Error eliminado exitosamente' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}


export { getProblems, getProblem, createProblem, updateProblem, deleteProblem }