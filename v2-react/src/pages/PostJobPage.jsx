import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const categories = ['Tech', 'Finance', 'Marketing', 'Healthcare', 'Education', 'Science']

function PostJobPage() {
    const { user, token } = useAuth()
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        title: '',
        company: '',
        location: '',
        category: 'Tech',
        salary: '',
        remote: false,
        description: ''
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const [success, setSuccess] = useState(false)

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            const res = await fetch(
                `${import.meta.env.VITE_API_URL}/api/jobs`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(formData)
                }
            )

            const data = await res.json()

            if (!res.ok) {
                setError(data.message)
                setLoading(false)
                return
            }

            setSuccess(true)
            setTimeout(() => navigate('/'), 2000)

        } catch (err) {
            setError('Something went wrong. Try again.')
            setLoading(false)
        }
    }

    if (success) {
        return (
            <div className="auth-page">
                <div className="auth-card">
                    <h2>Job posted successfully!</h2>
                    <p>Redirecting to homepage...</p>
                </div>
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
                <div className="user-menu">
                    <span>Hi, {user.name}</span>
                </div>
            </header>

            <main>
                <section className="job-detail">
                    <Link to="/" className="back-link">
                        ← Back to listings
                    </Link>

                    <div className="job-detail-card">
                        <h1>Post a new job</h1>
                        <p style={{ color: '#6B7280' }}>
                            Fill in the details below to post your job listing
                        </p>

                        {error && (
                            <p className="auth-error">{error}</p>
                        )}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="title">Job title</label>
                                <input
                                    type="text"
                                    id="title"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="e.g. Frontend Developer"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="company">Company name</label>
                                <input
                                    type="text"
                                    id="company"
                                    name="company"
                                    value={formData.company}
                                    onChange={handleChange}
                                    placeholder="e.g. Unicorn Inc"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="location">Location</label>
                                <input
                                    type="text"
                                    id="location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Remote, Paris, New York"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="category">Category</label>
                                <select
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                >
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>
                                            {cat}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-group">
                                <label htmlFor="salary">Salary</label>
                                <input
                                    type="text"
                                    id="salary"
                                    name="salary"
                                    value={formData.salary}
                                    onChange={handleChange}
                                    placeholder="e.g. $80,000/yr"
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="description">
                                    Job description
                                </label>
                                <textarea
                                    id="description"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    rows="5"
                                    placeholder="Describe the role, requirements, and what you offer..."
                                />
                            </div>

                            <div className="form-group">
                                <label
                                    style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        name="remote"
                                        checked={formData.remote}
                                        onChange={handleChange}
                                    />
                                    This is a remote position
                                </label>
                            </div>

                            <button
                                type="submit"
                                className="apply-btn"
                                disabled={loading}
                            >
                                {loading ? 'Posting...' : 'Post job'}
                            </button>
                        </form>
                    </div>
                </section>
            </main>
        </div>
    )
}

export default PostJobPage