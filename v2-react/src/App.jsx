import JobCard from './components/JobCard'
import jobs from './data/jobs'

function App() {
    return (
        <div>
            <JobCard job={jobs[0]} />
        </div>
    )
}

export default App