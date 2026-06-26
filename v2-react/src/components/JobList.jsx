import JobCard from './JobCard'

function JobList({ jobs }) {
    if (jobs.length === 0) {
        return (
            <p className="no-results">
                No jobs found matching your search.
            </p>
        )
    }

    return (
        <div className="jobs-grid">
            {jobs.map((job) => (
                <JobCard key={job._id} job={job} />
            ))}
        </div>
    )
}

export default JobList