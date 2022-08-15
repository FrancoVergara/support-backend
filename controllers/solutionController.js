import Solution from "../models/solutionModel.js";
import Problem from "../models/problemModel.js";

const getSolutions = async (req,res) => {
    try {
        // Find solutions
        const solutions = await Solution.find({})
        res.send(solutions)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const createSolution = async (req,res) => {

    const { problem } = req.body

    // Check if exist the problem and 
    const existProblem = await Problem.findById({ _id: problem })

    if(!existProblem) {
        const error = new Error('El error asignado no existe')
        return res.status(400).json({ message: error.message })
    }

    try {
        // Create and save solution
        const solution = Solution(req.body)
        await solution.save()

        // Add solution to ref
        existProblem.solutions.push(solution._id)
        await existProblem.save()

        res.send(solution)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const updateSolution = async (req,res) => {

    const { id } = req.params
    const { cbu, notes, resolution } = req.body

    // Check if solution exist
    const solution = await Solution.findById({ _id: id })

    if(!solution) {
        const error = new Error('La solucion no existe')
        return res.status(400).json({ message: error.message })
    }

    // Update solution - save new parameter if exist
    solution.cbu = cbu || solution.cbu
    solution.notes = notes || solution.notes
    solution.resolution = resolution || solution.resolution

    try {
        // Save solution
        await solution.save()
        res.send(solution)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const deleteSolution = async (req,res) => {

    const { id } = req.params

    // Check if user is admin
    if(req.user.role.role.toString().toLowerCase() !== 'admin' ) {
        const error = new Error('Debes ser admin para poder realizar esta accion')
        return res.status(403).json({ message: error.message })
    }

    // Check if solution exist
    const solution = await Solution.findById({ _id: id })

    if(!solution) {
        const error = new Error('La solucion no existe')
        return res.status(400).json({ message: error.message })
    }

    // Check if ref problem exist
    const problem = await Problem.findById({ _id: solution.problem })

    if(!problem) {
        const error = new Error('El error al que hace referencia la solucion, no existe')
        return res.status(400).json({ message: error.message })
    }

    try {
        // Delete solution ref from problem
        problem.solutions.pull(solution._id)
        await problem.save()

        // Delete solution
        await Solution.findByIdAndDelete({ _id: id })
        res.json({ message: 'Solucion eliminada exitosamente' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

export { getSolutions, createSolution, updateSolution, deleteSolution }