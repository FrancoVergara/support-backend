import Category from "../models/categoryModel.js";
import Problem from "../models/problemModel.js";
import Solution from "../models/solutionModel.js";

const getCategories = async (req,res) => {
    try {
        // Get categories and poopulate all
        const categories = await Category.find({})
            .populate({
                path: "problems",
                populate: {
                    path: "solutions",
                    select: "-createdAt -updatedAt -__v"
                },
                select: "-createdAt -updatedAt -__v"
            })
            .select("-createdAt -updatedAt -__v")

        res.json(categories)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const createCategory = async (req,res) => {

    const { name } = req.body

    // Check if exist
    const categoryExist = await Category.findOne({ name })

    if(categoryExist) {
        const error = new Error('La categoria ya existe')
        return res.status(400).json({ message: error.message })
    }

    try {
        // Create category
        const category = Category(req.body)
        await category.save()
        res.json(category)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const updateCategory = async (req,res) => {

    const { id } = req.params
    const { name } = req.body

    // Check if user is admin
    if(req.user.role.role.toString().toLowerCase() !== 'admin'){
        const error = new Error('Debes ser admin para poder realizar esta accion')
        return res.status(403).json({ message: error.message })
    }

    // Find category
    const category = await Category.findById({ _id: id })

    // Check if exist
    if(!category) {
        const error = new Error('La categoria no existe')
        return res.status(400).json({ message: error.message })
    }

    // Update category - save new parameter if exist
    category.name = name || category.name

    try {
        // Save category
        await category.save()
        res.json(category)

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const deleteCategory = async (req,res) => {

    const { id } = req.params

    // Check if user is admin
    if(req.user.role.role.toString().toLowerCase() !== 'admin'){
        const error = new Error('Debes ser admin para poder realizar esta accion')
        return res.status(403).json({ message: error.message })
    }

    // Check if category exist
    const category = await Category.findById({ _id: id })

    if(!category) {
        const error = new Error('La categoria no existe')
        return res.status(400).json({ message: error.message })
    }

    try {
        category.problems?.map( async problemState => {

            // Find problem
            const problem = await Problem.findById({ _id: problemState })

            // Delete solutions
            problem.solutions?.map( async solution => {
                await Solution.findByIdAndDelete({ _id: solution })
            })

            // Delete problems
            await Problem.findByIdAndDelete({ _id: problemState })

        })

        // Delete category
        await Category.findByIdAndDelete({ _id: id })
        res.json({ message: 'Categoria eliminada exitosamente' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

export { getCategories, createCategory, updateCategory, deleteCategory }