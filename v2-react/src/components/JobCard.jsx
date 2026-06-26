import { Link } from 'react-router-dom'

function JobCard({ job }) {
    return (
        <article className="job-card">
            <div className="job-card-header">
                <h3>{job.title}</h3>
                <span className="category-badge">{job.category}</span>
            </div>
            <p className="company">{job.company}</p>
            <p className="location">📍 {job.location}</p>
            <p className="salary">{job.salary}</p>
            {job.remote && <span className="remote-badge">Remote</span>}
            <Link to={`/jobs/${job._id}`} className="apply-btn">
                View details
            </Link>
        </article>
    )
}

export default JobCard