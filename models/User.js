import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true, // 🚨 IMPORTANT: Enforce uniqueness at DB level
  },
  password: {
    type: String,
    required: false,
  },
  name: {
    type: String,
    required: false, // ✅ allow saving Google user's name
  },
})

const User = mongoose.model('User', userSchema)
export default User
