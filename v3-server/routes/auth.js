const express = require('express')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const authMiddleware = require('../middleware/auth')

const router = express.Router()

// ============================================================
// POST /api/auth/signup
// ============================================================
router.post('/signup', async (req, res) => {
    try {
        const { name, email, password, role } = req.body

        // Validate input
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'All fields are required' })
        }

        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' })
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: 'Email already registered' })
        }

        // Hash the password
        // 12 = number of salt rounds (higher = more secure but slower)
        const hashedPassword = await bcrypt.hash(password, 12)

        // Create the user
        const user = new User({
            name,
            email,
            password: hashedPassword,
            role: role || 'user'
        })

        await user.save()

        // Create JWT token
        const token = jwt.sign(
            // Payload — data stored inside the token
            { userId: user._id, email: user.email, role: user.role },
            // Secret key
            process.env.JWT_SECRET,
            // Options
            { expiresIn: '7d' }    // token expires in 7 days
        )

        // Send back token and user info (never send password)
        res.status(201).json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

// ============================================================
// POST /api/auth/login
// ============================================================
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' })
        }

        // Find user by email
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        // Compare password with hashed version
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid email or password' })
        }

        // Create JWT token
        const token = jwt.sign(
            { userId: user._id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        )

        res.json({
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }
        })

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

// ============================================================
// GET /api/auth/me — get current logged in user
// ============================================================
router.get('/me', authMiddleware, async (req, res) => {
    try {
        // req.user was set by authMiddleware
        const user = await User.findById(req.user.userId).select('-password')
        // .select('-password') = return everything EXCEPT the password field

        if (!user) {
            return res.status(404).json({ message: 'User not found' })
        }

        res.json(user)

    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message })
    }
})

module.exports = router