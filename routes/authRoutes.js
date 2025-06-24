import express from 'express'
import passport from 'passport'
import { loginUser, signupUser, googleLogin } from '../controllers/authController.js'

const router = express.Router()

// 👤 Local auth routes
router.post('/login', loginUser)
router.post('/signup', signupUser)

// 📦 Google login (JWT from frontend)
router.post('/google-login', googleLogin)

// 🌐 Google OAuth redirect-based login (not used currently)
router.get('/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/google/callback',
  passport.authenticate('google', {
    successRedirect: '/auth/success',
    failureRedirect: '/auth/failure'
  })
)

router.get('/success', (req, res) => {
  res.send(`Welcome, ${req.user.displayName}`)
})

router.get('/failure', (req, res) => {
  res.send('Google login failed. Try again.')
})

export default router
