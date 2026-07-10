const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },
        email: {
            type: String,
            required: true,
            unique: true,        // no two users with same email
            lowercase: true,     // always store as lowercase
            trim: true
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            enum: ['user', 'employer'],
            default: 'user'      // regular job seeker by default
        },
        savedJobs: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Job'       // reference to Job documents
            }
        ]
    },
    {
        timestamps: true
    }
)

const User = mongoose.model('User', userSchema)

module.exports = User