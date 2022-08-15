import mongoose from "mongoose"

const newsSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    }
}, {
    timestamps: true
})

const News = mongoose.model('News', newsSchema)

export default News