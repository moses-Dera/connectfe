import React, {useState} from 'react'


function Login() {
  let [formData, setFormData] =useState({
    email:"",
    password:""
  })

  let handleChange =(vado)=>{
    // console.log(`${vado.target.name}:${vado.target.value}`)
    setFormData({...formData, [vado.target.name]:vado.target.value})
  }

  let handleSubmit = async(e)=>{
      e.preventDefault()
    try { 
      let response = await fetch("http://localhost:4900/api/user/login",{
        method:"POST",
        credentials:"include",
        headers:{
          'content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      })

      if (response.ok) {
        let data = await response.json()
          console.log('Login successful, token saved.');
      } else {
        let errorData = await response.json();
        console.error('Login failed:', errorData);
      }
    } catch (error) {
      console.error('An error occurred during login:', error);
    }
  }
  return (
    <div className='h-screen  grid place-items-center content-center gap-8'>
      <div className='text-2xl font-medium text-gray-600'>Login </div>
      <form onSubmit={handleSubmit} className='place-self-center m-auto '>
        <label className='flex flex-col gap-1'>
          <span className='text-gray-900 font-medium'>Email</span>
          <input
          type="text"
          name='email' 
          onChange={handleChange}
          className='bg-black text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500' 
          />

        </label>
        <label className='flex flex-col gap-1'>
          <span className='text-gray-900 font-medium'>Password</span>
          <input type="text"  
          name='password' 
          onChange={handleChange}
          className='bg-black text-white p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
          />
        </label>
        <button 
        type='submit'
        className='w-45 bg-[#d1cfc6] p-4 m-4 rounded-md '
        >
          submit
        </button>

      </form>
    </div>
  )
}

export default Login