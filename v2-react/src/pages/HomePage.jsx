import { useState } from 'react'
import { Link } from 'react-router-dom'
import JobList from '../components/JobList'
import FilterBar from '../components/FilterBar'
import jobs from '../data/jobs'

function HomePage() {
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')

    const filteredJobs = jobs.filter((job) => {
        const categoryMatch =
            activeCategory === 'all' || job.category === activeCategory
        const searchMatch =
            job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            job.company.toLowerCase().includes(searchQuery.toLowerCase())
        return categoryMatch && searchMatch
    })

    return (
        <div>
            <header className="header">
                <div className="logo">
                    <img src="/images/logo.svg" alt="Jobly logo" />
                    <p>Jobly</p>
                </div>
                <nav>
                    <ul className="nav-links">
                        <li><Link to="/">Home</Link></li>
                        <li><a href="#explore">Explore</a></li>
                        <li><a href="#post-a-job">Post a job</a></li>
                        <li><a href="#search">Search</a></li>
                    </ul>
                </nav>
                <button className="btn btn-login">Login</button>
            </header>

            <main>
                <section className="hero">
                    <h1>
                        Over <span className="highlight">7,000</span> jobs
                        are waiting for you
                    </h1>
                    <p>
                        Work with the best companies,
                        hire the experienced professionals
                    </p>
                    <form className="search-form">
                        <input type="text" placeholder="Search for jobs" />
                        <input type="text" placeholder="Enter location" />
                        <button type="button">Search</button>
                    </form>
                    <a href="">advanced search</a>
                </section>

                <section className="section-jobs">
                    <h2>Latest job listings</h2>
                    <FilterBar
                        activeCategory={activeCategory}
                        searchQuery={searchQuery}
                        onCategoryChange={setActiveCategory}
                        onSearchChange={setSearchQuery}
                    />
                    <JobList jobs={filteredJobs} />
                </section>
            </main>

            <footer className="footer">
                <h3>Jobly</h3>
                <div className="footer-column">
                    <h3>Job offers</h3>
                    <ul>
                        <li><a href="">Job openings</a></li>
                        <li><a href="">Employees</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Tips</h3>
                    <ul>
                        <li><a href="">Inspiration</a></li>
                        <li><a href="">New openings</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>My Jobs</h3>
                    <ul>
                        <li><a href="">Overview</a></li>
                        <li><a href="">Saved</a></li>
                    </ul>
                </div>
                <div className="footer-column">
                    <h3>Follow us</h3>
                    <ul>
                        <li><a href="">Facebook</a></li>
                        <li><a href="">Twitter</a></li>
                    </ul>
                </div>
            </footer>
        </div>
    )
}

export default HomePage