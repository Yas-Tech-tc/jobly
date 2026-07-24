import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import JobList from '../components/JobList'
import FilterBar from '../components/FilterBar'
import { useAuth } from '../context/AuthContext'

function HomePage() {
    const [jobs, setJobs] = useState([])
    const [activeCategory, setActiveCategory] = useState('all')
    const [searchQuery, setSearchQuery] = useState('')
    const [heroSearch, setHeroSearch] = useState('')
    const [heroLocation, setHeroLocation] = useState('')
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const { user, logout } = useAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        logout()
        navigate('/')
    }

    const handleHeroSearch = (e) => {
        e.preventDefault()
        setSearchQuery(heroSearch)
        document.getElementById('job-listings').scrollIntoView({
            behavior: 'smooth'
        })
    }

    useEffect(() => {
        setLoading(true)
        const params = new URLSearchParams()
        if (activeCategory !== 'all') params.append('category', activeCategory)
        if (searchQuery) params.append('search', searchQuery)

        const url = `${import.meta.env.VITE_API_URL}/api/jobs?${params}`

        fetch(url)
            .then(res => res.json())
            .then(data => {
                setJobs(data)
                setLoading(false)
            })
            .catch(err => {
                setError('Failed to load jobs. Is the server running?')
                setLoading(false)
            })
    }, [activeCategory, searchQuery])

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
                        <li><Link to="/post-job">Post a job</Link></li>
                        <li>
                            <a
                                href="#job-listings"
                                onClick={(e) => {
                                    e.preventDefault()
                                    document
                                        .getElementById('job-listings')
                                        .scrollIntoView({ behavior: 'smooth' })
                                }}
                            >
                                Search
                            </a>
                        </li>
                    </ul>
                </nav>
                {user ? (
                    <div className="user-menu">
                        <span>Hi, {user.name}</span>
                        <button
                            className="btn btn-login"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-login">
                        Login
                    </Link>
                )}
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
                    <form
                        className="search-form"
                        onSubmit={handleHeroSearch}
                    >
                        <input
                            type="text"
                            placeholder="Search for jobs"
                            value={heroSearch}
                            onChange={(e) => setHeroSearch(e.target.value)}
                        />
                        <input
                            type="text"
                            placeholder="Enter location"
                            value={heroLocation}
                            onChange={(e) => setHeroLocation(e.target.value)}
                        />
                        <button type="submit">Search</button>
                    </form>
                    <a
                        href="#job-listings"
                        onClick={(e) => {
                            e.preventDefault()
                            document
                                .getElementById('job-listings')
                                .scrollIntoView({ behavior: 'smooth' })
                        }}
                    >
                        advanced search
                    </a>
                </section>

                <section className="section-jobs" id="job-listings">
                    <h2>Latest job listings</h2>
                    <FilterBar
                        activeCategory={activeCategory}
                        searchQuery={searchQuery}
                        onCategoryChange={setActiveCategory}
                        onSearchChange={setSearchQuery}
                    />
                    {loading && (
                        <p className="no-results">Loading jobs...</p>
                    )}
                    {error && (
                        <p className="no-results">{error}</p>
                    )}
                    {!loading && !error && (
                        <JobList jobs={jobs} />
                    )}
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