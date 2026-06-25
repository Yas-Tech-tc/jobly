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
            <button className="apply-btn">Apply now</button>
        </article>
    )
}

export default JobCard