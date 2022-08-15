import Role from "../models/roleModel.js";

const createRole = async (req,res) => {

    // Look if exist
    const roleExist = await Role.findOne(req.body)

    if(roleExist) {
        const error = new Error('El rol ya existe')
        return res.status(400).json({ message: error.message })
    }

    try {
        // Create rol
        const newRole = Role(req.body)
        await newRole.save()

        res.json({ message: 'Rol creado exitosamente' })

    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

export { createRole }