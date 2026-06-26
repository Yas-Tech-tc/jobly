const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Job = require('./models/Job')

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('MongoDB connection error:', err))

app.get('/api/jobs', async (req, res) => {
    try {
        const { category, search } = req.query
        const filter = {}

        if (category && category !== 'all') {
            filter.category = category
        }

        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { company: { $regex: search, $options: 'i' } }
            ]
        }

        const jobs = await Job.find(filter).sort({ createdAt: -1 })
        res.json(jobs)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

app.get('/api/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findById(req.params.id)

        if (!job) {
            return res.status(404).json({ message: 'Job not found' })
        }

        res.json(job)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

app.post('/api/jobs', async (req, res) => {
    try {
        const job = new Job(req.body)
        const savedJob = await job.save()
        res.status(201).json(savedJob)

    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error: error.message })
    }
})

app.delete('/api/jobs/:id', async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id)

        if (!job) {
            return res.status(404).json({ message: 'Job not found' })
        }

        res.json({ message: 'Job deleted successfully' })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

app.get('/', (req, res) => {
    res.json({ message: 'Jobly API is running' })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})