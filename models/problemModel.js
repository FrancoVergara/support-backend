import mongoose from "mongoose";

const problemSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category"
    },
    solutions: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Solution"
        }
    ]
}, {
    timestamps: true
})

const Problem = mongoose.model('Problem', problemSchema)

export default Problem