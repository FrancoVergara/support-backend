import jwt from "jsonwebtoken"

const generateJWT = id => {
    const token = jwt.sign({ id }, process.env.SECRET_WORD, { expiresIn: '30d' })
    return token
}

export default generateJWT