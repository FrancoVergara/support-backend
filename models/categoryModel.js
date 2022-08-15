import mongoose from "mongoose"

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    problems: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Problem"
        }
    ]
})

const Category = mongoose.model("Category", categorySchema)

export default Category