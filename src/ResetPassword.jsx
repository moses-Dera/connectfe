import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function ResetPassword() {
  const { resetToken } = useParams()
  const [formData, setFormData] = useState({
    password: '',
    confirmPassword: ''
  })
  const [message, setMessage] = useState('')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) {
      setMessage('Passwords do not match')
      return
    }
    try {
      const response = await fetch(`http://localhost:4900/api/user/reset-password/${resetToken}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: formData.password })
      })
      const data = await response.json()
      setMessage('Password reset successfully')
    } catch (error) {
      setMessage('Error resetting password')
    }
  }

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center'>
      <div className='bg-white p-8 rounded-lg shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold text-center mb-6'>Reset Password</h2>
        
        <form onSubmit={handleSubmit} className='space-y-4'>
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              New Password
            </label>
            <input
              type='password'
              name='password'
              value={formData.password}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Enter new password'
              required
            />
          </div>
          
          <div>
            <label className='block text-sm font-medium text-gray-700 mb-1'>
              Confirm Password
            </label>
            <input
              type='password'
              name='confirmPassword'
              value={formData.confirmPassword}
              onChange={handleChange}
              className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Confirm new password'
              required
            />
          </div>
          
          <button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500'
          >
            Reset Password
          </button>
        </form>
        
        {message && (
          <p className={`mt-4 text-center text-sm ${
            message.includes('successfully') ? 'text-green-600' : 'text-red-600'
          }`}>
            {message}
          </p>
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

export default ResetPassword