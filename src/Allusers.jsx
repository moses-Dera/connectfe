import React, { useEffect, useState } from 'react'
import EditComp from './EditComp';

function Allusers() {
    let [holdUsers, setHoldUsers] = useState([]);
    let [showModal, setShowModal] = useState(false);
    let [selectedUser, setSelectedUser] = useState("")

    useEffect(()=>{
        let fetchUser = async()=>{
            try {
                let response = await fetch('http://localhost:4900/api/user/allusers',{
                    method:"GET",
                    credentials:"include"
                })
                let data = await response.json()
                setHoldUsers(data.users)
                console.log(data.users)
            } catch (error) {
                console.log(error)
            }
        }
        fetchUser()
    },[])

    let handleDelete = async(myid)=>{
        try {
            let response = await fetch(`http://localhost:4900/api/user/${myid}`,{
                method:"DELETE",
                 headers: {
                        "Content-Type": "application/json",
                    },
                credentials:"include"

            })
            if (response.ok) {
                // Remove the deleted user from the state
                setHoldUsers((prevUsers) => prevUsers.filter((user) => user._id !== myid))
            } else {
                console.error('Delete failed:', await response.text())
            }
        } catch (error) {
            console.error('Delete error:', error)
        }
    }

    let revealModal =(myUser)=>{
        setShowModal(!showModal)
        setSelectedUser(myUser)
    }
    

  return (
    <div className='flex justify-center'>
        <table className='bg-gray-600 text-center text-white border-2 border-solid w-full'> 
            <thead className='border-2 border-solid' >
                <tr className='bg-ga-300'>
                    <th>FirstName</th>
                    <th>LastName</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {
                    holdUsers.length > 0 ? holdUsers.map((obi, index)=>(
                    <tr key={index}>
                        <td>{obi.firstName}</td>
                        <td>{obi.lastName}</td>
                        <td>{obi.email}</td>
                        <td>{obi.role}</td>
                        <button onClick={()=>revealModal(obi)} className='cursor-pointer'><td>🖋️</td></button>
                        <td><button onClick={() => handleDelete(obi._id)} className='cursor-pointer' >🗑️</button></td>
                    </tr>   
                    )) : (
                        <tr>
                            <td colSpan="6">loading....</td>
                        </tr>
                    )
                }
            </tbody>
        </table>
        {
            showModal && <EditComp revealModal={revealModal} selectedUser={selectedUser}/>
        }
    </div>
  )
}

export default Allusers