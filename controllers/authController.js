import User from '../models/User.js'
import bcrypt from 'bcryptjs'
import { OAuth2Client } from 'google-auth-library';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'airplane_jwt_secret';

export const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({ message: 'Login successful', token, user: { id: user._id, email: user.email } })
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

    const token = jwt.sign({ id: newUser._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'User created', userId: newUser._id, token, user: { id: newUser._id, email: newUser.email } })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Server error' })
  }
}

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

export const googleLogin = async (req, res) => {
  const { token: googleToken, mode } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name } = payload;

    if (!email) {
      return res.status(400).json({ message: 'Invalid token payload' });
    }

    let user = await User.findOne({ email });

    if (mode === 'login') {
      if (!user) {
        return res.status(404).json({ message: 'User not found. Please sign up first.' });
      }
    } else if (mode === 'signup') {
      if (user) {
        return res.status(400).json({ message: 'User already exists. Please log in.' });
      }
      user = new User({ email, name, password: '' });
      await user.save();
      const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
      return res.status(201).json({
        message: 'Google signup successful',
        user: { id: user._id, email: user.email },
        token: jwtToken,
      });
    }

    const jwtToken = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });
    res.status(200).json({
      message: 'Google login successful',
      user: { id: user._id, email: user.email },
      token: jwtToken,
    });
  } catch (err) {
    console.error('Google Auth Error:', err);
    res.status(401).json({ message: 'Invalid Google token or server error' });
  }
};

