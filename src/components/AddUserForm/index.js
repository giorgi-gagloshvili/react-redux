import { useState } from 'react'
import { useEffect } from 'react'
import { getUsers, addUser, editUser } from './../../redux/usersSlice'



import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const AddUserForm = ({ pathName, id }) => {

    const dispatch = useDispatch()
    
    const users = useSelector(state => state.users.users)
    const [userData, setUserData] = useState({first_name: '', last_name: '', birth_date: '', role: '', status: ''})
    const navigate = useNavigate()

    const [statusArray, setStatusArray] = useState(['', 'Active', 'Inactive', 'Blocked'])
    const [roleArray, setRoleArray] = useState(['', 'Admin', 'Moderator', 'User'])

    useEffect(() => {
        const fn = () => {
            if(id) {
                dispatch(getUsers())
                const d = users.find(item => item.id === Number(id))
                setUserData(d)
            }
        }
        fn()
    }, [dispatch])

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        if(!userData.first_name || !userData.last_name || !userData.birth_date || !userData.role || !userData.status) {
            console.log('All fields are required')
            return
        }
        pathName ? dispatch(editUser(userData, id)) : dispatch(addUser(userData))
        setUserData({first_name: '', last_name: '', birth_date: '', role: '', status: ''})
        navigate('/')
    }

    return (
        <>
            {userData && <form onSubmit={ handleSubmit } className="mt-10">
                <h2 className="text-3xl	">{id ? 'Edit User' : 'Add User'}</h2>
                <div className='mt-2'>
                    <label htmlFor="" className="block">Firstname</label>
                    <input type="text" className="border outline-none p-2 w-full" value={userData.first_name} onChange={handleChange} name="first_name" />
                </div>
                <div className='mt-2'>
                    <label htmlFor="" className="block">Lastname</label>
                    <input type="text" className="border outline-none p-2 w-full" value={userData.last_name} onChange={handleChange} name="last_name" />
                </div>
                <div className='mt-2'>
                    <label htmlFor="" className="block">Birth Date</label>
                    <input type="text" className="border outline-none p-2 w-full" value={userData.birth_date} onChange={handleChange} name="birth_date" />
                </div>
                <div className='mt-2'>
                    <label htmlFor="" className="block">Status</label>
                    <select name="status" className="border p-2 outline-none" onChange={handleChange}>
                        {statusArray.map(status => (<option key={status} value={status}>
                            {status === '' ? 'Select Status' : status}
                        </option>))}
                    </select>
                    {/* <input type="text" className="border outline-none p-2 w-full" value={userData.status} onChange={handleChange} name="status" /> */}
                </div>
                <div className='mt-2'>
                    <label htmlFor="" className="block">Role</label>
                    <select name="role" className="border p-2 outline-none" onChange={handleChange}>
                        {roleArray.map(role => (<option key={role} value={role}>
                            {role === '' ? 'Select Role' : role}
                        </option>))}
                    </select>
                    {/* <input type="text" className="border outline-none p-2 w-full" value={userData.role} onChange={handleChange} name="role" /> */}
                </div>

                <div className='mt-2'>
                    <button type="submit" className='border px-6 py-2'>Submit</button>
                </div>
            </form>}
        </>
    );
}
 
export default AddUserForm;