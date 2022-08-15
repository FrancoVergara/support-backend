import User from "../models/userModel.js"
import jwt from "jsonwebtoken"

const checkAuth = async (req, res, next) => {
    
    let token

    // See if authorization contain a token
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Get token from the authorization field
            token = req.headers.authorization.split(" ")[1]

            // Decode token to get the ID
            const decode = jwt.verify(token, process.env.SECRET_WORD)

            // Find user with this ID and get info without some items
            req.user = await User.findById(decode.id).select("-password -confirmed -token -createdAt -updatedAt -__v").populate("role")

            return next()

        } catch (error) {
            return res.status(404).json({ message : "Hubo un error" })
        }
    }

    // If token doesn't exists, throw error
    if(!token) {
        const error = new Error("Autenticacion no valida")
        return res.status(401).json({ message : error.message })
    }
    
    next()
}

export default checkAuth