const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
            trim: true
        },
        company: {
            type: String,
            required: true,
            trim: true
        },
        location: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true,
            enum: ['Tech', 'Finance', 'Marketing', 'Healthcare', 'Education', 'Science']
        },
        salary: {
            type: String,
            required: true
        },
        remote: {
            type: Boolean,
            default: false
        },
        description: {
            type: String,
            default: ''
        },
        postedBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: false
        },
    },
    {
        timestamps: true
    }
)

const Job = mongoose.model('Job', jobSchema)

module.exports = Job