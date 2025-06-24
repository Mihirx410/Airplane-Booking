import { useState } from 'react'
import axios from 'axios'
import AuthForm from '../components/AuthForm'

const Signup = () => {
  const [loading, setLoading] = useState(false)

  const handleSignup = async ({ email, password }) => {
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', {
        email,
        password,
      })
      alert(`Signup Success! User ID: ${res.data.userId}`)
    } catch (err) {
      if (err.response?.status === 400) {
        alert('User already exists. Try logging in instead.')
      } else {
        alert(err.response?.data?.message || 'Signup failed')
      }
    } finally {
      setLoading(false)
    }
  }

  return <AuthForm type="signup" onSubmit={handleSignup} loading={loading} />
}

export default Signup
