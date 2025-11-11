import React, { useEffect, useState } from 'react'

function EditComp({revealModal, selectedUser}) {

  let [formData, setFormData] = useState({
    firstName:"",
    lastName:"",
    email:"",
    role:""
  })
  
  useEffect(()=>{
    if(selectedUser){
      setFormData({
        firstName:selectedUser.firstName,
        lastName:selectedUser.lastName,
        email:selectedUser.email,
        role:selectedUser.role
      })
    }
  },[selectedUser])

  let handleChange =(vado)=>{
    // console.log(`${vado.target.name}:${vado.target.value}`)
    setFormData({...formData, [vado.target.name]:vado.target.value})
  }

  let handleUpdate = async(e)=>{
      e.preventDefault()
    try { 
      let response = await fetch(`http://localhost:4900/api/user/${selectedUser._id}`,{
        method:"PUT",
        credentials:"include",
        headers:{
          'content-Type':'application/json',
        },
        body: JSON.stringify(formData)
      })

      let data = await response.json()
      console.log(data)
    } catch (error) {
      
    }
  }


  return (
    <div className='h-screen bg-[#0009] grid place-items-center absolute w-full'>
        <button onClick={revealModal} className=' cursor-pointer bg-white p-2 w-10 h-10 absolute top-6 right-10 lg:right-29 rounded-full '>❌</button>
        <section className='w-[50%] sm:w-[60%] md:w-[40%] lg:w-[40%] bg-white rounded-lg shadow-xl p-8'>
          <form onSubmit={handleUpdate} className=' m-auto flex flex-col gap-2'>
            <h1 className='text-3xl font-extrabold text-center'>Edit user</h1>

            <label className='flex flex-col gap-1'>
              <span className='text-gray-900 font-medium'>First Name</span>
              <input 
              type="text" 
              name='firstName'
              value={formData.firstName}
              onChange={handleChange}
              className='w-full bg-white border-2 border-black p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blu-500' 
              />
            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-gray-900 font-medium'>last Name</span>
              <input 
              type="text" 
              name='lastName'
              onChange={handleChange}
              value={formData.lastName}
              className='w-full bg-white border-2 border-black  p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-black-500' 
              />
            </label>

            <label className='flex flex-col gap-1'>
              <span className='text-gray-900 font-medium focus:outline-none focus:ring-2 focus:ring-black-500'>Email</span>
              <input
              type="email"
              name='email' 
              onChange={handleChange}
              value={formData.email}
              className='w-full p-2 rounded-md border-2 border-black  focus:outline-none focus:ring-2 focus:ring-black-500' 
              />

            </label>
            <label className='flex flex-col gap-1'>
              <span className='text-gray-900 font-medium'>Role</span>
              <input
              type="text"
              name='role' 
              onChange={handleChange}
              value={formData.role}
              className='w-full p-2 rounded-md border-2 border-black  focus:outline-none focus:ring-2 focus:ring-black-500' 
              />

            </label>
          
            <button 
            type='summit'
            // onClick={handleUpdate()}
            className='w-full bg-[#d1cfc6] text-2xl text-gray-700 font-bold p-4 rounded-md hover:bg-transparent hover:border-2 border-gray-500 '
            >
              Reset
            </button>
          </form>
        </section>
    </div>
  )
}

export default EditComp