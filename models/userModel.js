import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Role",
        required: true,
        trim: true
    },
    token: {
        type: String
    }
}, {
    timestamps: true
})

// Funtion to do before save user
userSchema.pre('save', async function(next) {

    // Check if password was modified
    if(!this.isModified('password')) {
        next()
    }

    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hashSync(this.password, salt)
})

// Add function to model - Validate encrypt password
userSchema.methods.validatePassword = async function(formPassword) {
    return await bcrypt.compare(formPassword, this.password)
}

const User = mongoose.model('User', userSchema)

export default User