import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library';

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    res.status(200).json({ message: 'Login successful' })
  } catch (err) {
    res.status(500).json({ message: 'Server error' })
  }
}


export const signupUser = async (req, res) => {
    const { email, password } = req.body
  
    // Basic input validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' })
    }
  
    try {
      const existingUser = await User.findOne({ email })
      if (existingUser) {
        return res.status(400).json({ message: 'User already exists' })
      }
  
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = new User({ email, password: hashedPassword })
      await newUser.save()
  
      res.status(201).json({ message: 'User created', userId: newUser._id })
    } catch (err) {
      console.error(err)
      res.status(500).json({ message: 'Server error' })
    }
  }

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  export const googleLogin = async (req, res) => {
    const { token, mode } = req.body; // 'login' or 'signup'
  
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
  
      const payload = ticket.getPayload();
      const { email, name } = payload;
  
      if (!email) {
        return res.status(400).json({ message: 'Invalid token payload' });
      }
  
      const user = await User.findOne({ email });
  
      if (mode === 'login') {
        if (!user) {
          return res.status(404).json({ message: 'User not found. Please sign up first.' });
        }
      } else if (mode === 'signup') {
        if (user) {
          return res.status(400).json({ message: 'User already exists. Please log in.' });
        }
        const newUser = new User({ email, name, password: '' }); // Store name, password can be empty
        await newUser.save();
        return res.status(201).json({
            message: 'Google signup successful',
            user: { id: newUser._id, email: newUser.email },
        });
      }
  
      res.status(200).json({
        message: 'Google login successful',
        user: { id: user._id, email: user.email },
      });
    } catch (err) {
      console.error('Google Auth Error:', err);
      res.status(401).json({ message: 'Invalid Google token or server error' });
    }
  };

