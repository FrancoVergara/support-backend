import mongoose from "mongoose"

const solutionSchema = mongoose.Schema({
    cbu: {
        type: String,
        required: true,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    resolution: {
        type: String,
        required: true
    },
    problem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Problem"
    }
}, {
    timestamps: true
})

const Solution = mongoose.model('Solution', solutionSchema)

export default Solution