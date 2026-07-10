const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    // Get token from request header
    const authHeader = req.headers.authorization

    // Check header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'No token provided' })
    }

    // Extract the token (remove "Bearer " prefix)
    const token = authHeader.split(' ')[1]

    try {
        // Verify the token using our secret
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        // Attach the decoded user data to the request
        req.user = decoded

        // Call next() to pass control to the actual route handler
        next()

    } catch (error) {
        return res.status(401).json({ message: 'Invalid or expired token' })
    }
}

module.exports = authMiddleware