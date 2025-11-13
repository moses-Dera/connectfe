import React, { useState } from 'react'

function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('http://localhost:4900/api/user/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })
      const data = await response.json()
      setMessage('Password reset link sent to your email')
    } catch (error) {
      setMessage('Error sending reset link')
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Forgot Password</h2>
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Email Address
            </label>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter your email'
              required
            />
          </div>
          
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Send Reset Link
          </button>
        </form>
        
        {message && (
          <p className='mt-4 text-center text-sm text-green-600'>{message}</p>
        )}
        
        <div className='mt-6 text-center'>
          <a href='/login' className='text-sm text-blue-600 hover:underline'>
            Back to Login
          </a>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword