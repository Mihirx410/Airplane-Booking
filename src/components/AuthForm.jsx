import { useState } from 'react'

const AuthForm = ({
  type,
  onSubmit,
  loading,
  email,
  password,
  setEmail,
  setPassword,
}) => {
  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {type === 'login' ? 'Login to your account' : 'Create an account'}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            placeholder="Email"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            placeholder="Password"
            className="w-full mt-1 p-3 border rounded-lg focus:ring-blue-500 focus:border-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 transition-colors"
          disabled={loading}
        >
          {loading
            ? type === 'login'
              ? 'Logging in...'
              : 'Signing up...'
            : type === 'login'
            ? 'Login'
            : 'Signup'}
        </button>
      </form>
    </div>
  )
}

export default AuthForm
