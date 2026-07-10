import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, requiredRole }) {
    const { user, loading } = useAuth()

    // Wait for auth to finish checking localStorage
    if (loading) {
        return <p className="no-results">Loading...</p>
    }

    // Not logged in → redirect to login
    if (!user) {
        return <Navigate to="/login" replace />
    }

    // Logged in but wrong role → show unauthorized
    if (requiredRole && user.role !== requiredRole) {
        return (
            <div className="not-found">
                <h2>Access denied</h2>
                <p>This page is for {requiredRole}s only.</p>
                <p>You are logged in as a {user.role}.</p>
            </div>
        )
    }

    // All checks passed → show the page
    return children
}

export default ProtectedRoute