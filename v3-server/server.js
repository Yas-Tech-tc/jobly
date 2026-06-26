// ============================================================
// IMPORTS
// ============================================================
const express = require('express')
const cors = require('cors')

// ============================================================
// APP SETUP
// ============================================================
const app = express()
const PORT = 3001

// Middleware — runs on every request before your routes
app.use(cors())                    // allow React frontend to call this server
app.use(express.json())            // allow server to read JSON request bodies

// ============================================================
// DATA (same jobs array as before)
// ============================================================
const jobs = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Unicorn",
        location: "Remote",
        category: "Tech",
        salary: "$90,000/yr",
        remote: true
    },
    {
        id: 2,
        title: "Financial Analyst",
        company: "B Bank",
        location: "New York, USA",
        category: "Finance",
        salary: "$75,000/yr",
        remote: false
    },
    {
        id: 3,
        title: "Marketing Manager",
        company: "Tech Foals",
        location: "London, UK",
        category: "Marketing",
        salary: "$65,000/yr",
        remote: true
    },
    {
        id: 4,
        title: "Backend Engineer",
        company: "Unicorn",
        location: "Remote",
        category: "Tech",
        salary: "$110,000/yr",
        remote: true
    },
    {
        id: 5,
        title: "Data Scientist",
        company: "B Bank",
        location: "Paris, France",
        category: "Finance",
        salary: "$95,000/yr",
        remote: false
    },
    {
        id: 6,
        title: "UX Designer",
        company: "McBurger",
        location: "Remote",
        category: "Tech",
        salary: "$80,000/yr",
        remote: true
    },
    {
        id: 7,
        title: "Registered Nurse",
        company: "HealthPlus",
        location: "Berlin, Germany",
        category: "Healthcare",
        salary: "$70,000/yr",
        remote: false
    },
    {
        id: 8,
        title: "SEO Specialist",
        company: "Tech Foals",
        location: "Remote",
        category: "Marketing",
        salary: "$55,000/yr",
        remote: true
    }
]

// ============================================================
// ROUTES
// ============================================================

// GET /api/jobs — return all jobs (with optional category filter)
app.get('/api/jobs', (req, res) => {
    const { category, search } = req.query

    let filtered = jobs

    // Filter by category if provided
    if (category && category !== 'all') {
        filtered = filtered.filter(job => job.category === category)
    }

    // Filter by search if provided
    if (search) {
        filtered = filtered.filter(job =>
            job.title.toLowerCase().includes(search.toLowerCase()) ||
            job.company.toLowerCase().includes(search.toLowerCase())
        )
    }

    res.json(filtered)
})

// GET /api/jobs/:id — return one job by id
app.get('/api/jobs/:id', (req, res) => {
    const id = Number(req.params.id)
    const job = jobs.find(j => j.id === id)

    if (!job) {
        return res.status(404).json({ message: 'Job not found' })
    }

    res.json(job)
})

// Health check — useful to confirm server is running
app.get('/', (req, res) => {
    res.json({ message: 'Jobly API is running' })
})

// ============================================================
// START SERVER
// ============================================================
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`)
})