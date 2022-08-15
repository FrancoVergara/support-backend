import User from "../models/userModel.js"
import Role from "../models/roleModel.js"
import generateJWT from "../helpers/generateJWT.js"

const createUser = async (req,res) => {
    
    const { email, role } = req.body

    // Check if email already exist
    const emailExist = await User.findOne({ email })

    if(emailExist) {
        const error = new Error('El email ya se encuentra registrado')
        return res.status(400).json({ message: error.message })
    }

    // Check if role exist
    const roleExist = await Role.findById({ _id: role })

    if(!roleExist) {
        const error = new Error('El rol no existe')
        return res.status(400).json({ message: error.message })
    }

    try {
        // Create user
        const user = new User(req.body)
        await user.save()

        res.json({ message: 'Usuario registrado correctamente' })

    } catch (error) {
        return res.status(500).json({ message: 'Hubo un error' })
    }
}

const logIn = async (req,res) => {

    const { name, password } = req.body

    // Find user
    const user = await User.findOne({name})

    // If user doesn't exist
    if(!user) {
        const error = new Error('El usuario no existe')
        return res.status(404).json({ message: error.message })
    }

    // Validate password
    if(await user.validatePassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateJWT(user._id)
        })

    } else {
        const error = new Error('Password incorrecta')
        return res.status(404).json({ message: error.message })
    }
}

const getUser = async (req, res) => {
    
    const { user } = req

    res.send(user)
}

export { createUser, logIn, getUser }