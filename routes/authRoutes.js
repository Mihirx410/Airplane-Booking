import express from 'express'
import { loginUser, signupUser, googleLogin } from '../controllers/authController.js'

const router = express.Router()

// 👤 Local auth routes
router.post('/login', loginUser)
router.post('/signup', signupUser)

// 📦 Google login (JWT from frontend)
router.post('/google-login', googleLogin)

export default router
