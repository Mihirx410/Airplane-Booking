import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'
import authRoutes from './routes/authRoutes.js'
import connectDB from './config/db.js'
import session from 'express-session';
import passport from 'passport';
import './config/passport.js';
import bookingRoutes from './routes/bookingRoutes.js'


dotenv.config()
const app = express()

app.use(session({
    secret: 'mihir_airplane_secret',
    resave: false,
    saveUninitialized: true
  }));
  
  app.use(passport.initialize());
  app.use(passport.session());


// Middlewares
app.use(cors())
app.use(express.json())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/bookings', bookingRoutes)

// Start server
const PORT = process.env.PORT || 5000
connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})
