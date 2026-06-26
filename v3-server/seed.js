const mongoose = require('mongoose')
const dotenv = require('dotenv')
const Job = require('./models/Job')

dotenv.config()

const jobs = [
    {
        title: "Frontend Developer",
        company: "Unicorn",
        location: "Remote",
        category: "Tech",
        salary: "$90,000/yr",
        remote: true,
        description: "We are looking for a talented Frontend Developer to join our team."
    },
    {
        title: "Financial Analyst",
        company: "B Bank",
        location: "New York, USA",
        category: "Finance",
        salary: "$75,000/yr",
        remote: false,
        description: "Join our finance team and work on exciting financial projects."
    },
    {
        title: "Marketing Manager",
        company: "Tech Foals",
        location: "London, UK",
        category: "Marketing",
        salary: "$65,000/yr",
        remote: true,
        description: "Lead our marketing efforts and grow our brand globally."
    },
    {
        title: "Backend Engineer",
        company: "Unicorn",
        location: "Remote",
        category: "Tech",
        salary: "$110,000/yr",
        remote: true,
        description: "Build and scale our backend infrastructure."
    },
    {
        title: "Data Scientist",
        company: "B Bank",
        location: "Paris, France",
        category: "Finance",
        salary: "$95,000/yr",
        remote: false,
        description: "Work with large datasets to drive business decisions."
    },
    {
        title: "UX Designer",
        company: "McBurger",
        location: "Remote",
        category: "Tech",
        salary: "$80,000/yr",
        remote: true,
        description: "Design beautiful user experiences for millions of users."
    },
    {
        title: "Registered Nurse",
        company: "HealthPlus",
        location: "Berlin, Germany",
        category: "Healthcare",
        salary: "$70,000/yr",
        remote: false,
        description: "Provide excellent patient care in our modern facilities."
    },
    {
        title: "SEO Specialist",
        company: "Tech Foals",
        location: "Remote",
        category: "Marketing",
        salary: "$55,000/yr",
        remote: true,
        description: "Grow our organic traffic through smart SEO strategies."
    }
]

async function seedDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Connected to MongoDB')

        await Job.deleteMany({})
        console.log('Cleared existing jobs')

        await Job.insertMany(jobs)
        console.log(`Inserted ${jobs.length} jobs`)

        console.log('Database seeded successfully!')
        process.exit(0)

    } catch (error) {
        console.error('Seed failed:', error)
        process.exit(1)
    }
}

seedDatabase()