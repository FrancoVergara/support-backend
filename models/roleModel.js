import mongoose from "mongoose";

const roleSchema = mongoose.Schema({
    role: {
        type: String,
        trim: true,
        required: true
    }
})

const Role = mongoose.model('Role', roleSchema)

export default Role