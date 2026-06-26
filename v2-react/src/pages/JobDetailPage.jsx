import { useParams, Link } from 'react-router-dom'
import jobs from '../data/jobs'

function JobDetailPage() {
    const { id } = useParams()

    const job = jobs.find((j) => j.id === Number(id))

    if (!job) {
        return (
            <div className="not-found">
                <h2>Job not found</h2>
                <Link to="/" className="back-link">← Back to all jobs</Link>
            </div>
        )
    }

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
                    </ul>
                </nav>
                <button className="btn btn-login">Login</button>
            </header>

            <main>
                <section className="job-detail">
                    <Link to="/" className="back-link">← Back to all jobs</Link>

                    <div className="job-detail-card">
                        <div className="job-detail-header">
                            <div>
                                <h1>{job.title}</h1>
                                <p className="company">{job.company}</p>
                            </div>
                            <span className="category-badge">{job.category}</span>
                        </div>

                        <div className="job-detail-meta">
                            <p>📍 {job.location}</p>
                            <p className="salary">{job.salary}</p>
                            {job.remote && (
                                <span className="remote-badge">Remote</span>
                            )}
                        </div>

                        <div className="job-detail-description">
                            <h2>About this role</h2>
                            <p>
                                We are looking for a talented {job.title} to
                                join our team at {job.company}. You will work
                                on exciting projects and collaborate with a
                                world-class team.
                            </p>

                            <h2>Requirements</h2>
                            <ul>
                                <li>3+ years of experience in a similar role</li>
                                <li>Strong communication skills</li>
                                <li>Experience working in an agile team</li>
                                <li>Passion for building great products</li>
                            </ul>

                            <h2>What we offer</h2>
                            <ul>
                                <li>Competitive salary: {job.salary}</li>
                                <li>{job.remote ? 'Fully remote' : 'On-site at ' + job.location}</li>
                                <li>Health insurance</li>
                                <li>Annual learning budget</li>
                            </ul>
                        </div>

                        <div className="apply-form">
                            <h2>Apply for this position</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="name">Full name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        placeholder="Your full name"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        placeholder="your@email.com"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="cv">CV link</label>
                                    <input
                                        type="url"
                                        id="cv"
                                        placeholder="Link to your CV or LinkedIn"
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">
                                        Why do you want this role?
                                    </label>
                                    <textarea
                                        id="message"
                                        rows="4"
                                        placeholder="Tell us a bit about yourself..."
                                    />
                                </div>
                                <button type="submit" className="apply-btn">
                                    Submit application
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default JobDetailPage