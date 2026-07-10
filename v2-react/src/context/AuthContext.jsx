import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [token, setToken] = useState(localStorage.getItem('token'))
    const [loading, setLoading] = useState(true)

    // Check if user is already logged in on app load
    useEffect(() => {
        if (token) {
            fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`, {
                headers: { Authorization: `Bearer ${token}` }
            })
                .then(res => res.json())
                .then(data => {
                    if (data._id) setUser(data)
                    else {
                        // Token expired or invalid
                        localStorage.removeItem('token')
                        setToken(null)
                    }
                    setLoading(false)
                })
                .catch(() => setLoading(false))
        } else {
            setLoading(false)
        }
    }, [])

    const login = (userData, userToken) => {
        setUser(userData)
        setToken(userToken)
        localStorage.setItem('token', userToken)
    }

    const logout = () => {
        setUser(null)
        setToken(null)
        localStorage.removeItem('token')
    }

    return (
        <AuthContext.Provider value={{ user, token, login, logout, loading }}>
            {children}
        </AuthContext.Provider>
    )
}

// Custom hook to use auth anywhere in the app
export function useAuth() {
    return useContext(AuthContext)
}