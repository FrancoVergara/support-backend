import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import connectDb from "./config/db.js"
import userRoutes from "./routes/userRoutes.js"
import roleRoutes from "./routes/roleRoutes.js"
import categoryRoutes from "./routes/categoryRoutes.js"
import problemRoutes from "./routes/problemRoutes.js"
import solutionRoutes from "./routes/solutionRoutes.js"
import newsRoutes from "./routes/newsRoutes.js"

// Start app
const app = express()
app.use(express.json())

// Access to .env files
dotenv.config()

// Connect DB
connectDb()

// Habilitar cors
// const whiteList = [process.env.FRONTEND_URL]

// const corsOptions = {
//     origin: function(origin, callback) {
//         if(whiteList.includes(origin)) {
//             callback(null, true)
//         } else {
//             callback(new Error('CORS error'))
//         }
//     }
// }

// app.use(cors(corsOptions))
app.use(cors())

// Routing
app.use('/users', userRoutes)
app.use('/roles', roleRoutes)
app.use('/categories', categoryRoutes)
app.use('/problems', problemRoutes)
app.use('/solutions', solutionRoutes)
app.use('/news', newsRoutes)

// Define port
const PORT = process.env.NODE_PORT || 4000

app.listen(PORT, () => {
    console.log(`Listen in port ${PORT}`)
})
