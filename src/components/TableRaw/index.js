import { useDispatch } from 'react-redux'
import { removeUser } from './../../redux/usersSlice'
import { Link } from 'react-router-dom'

const TableRaw = ({ id, first_name, last_name, birth_date, status, role }) => {
    const dispatch = useDispatch()
    return (
        <tr>
            <td className="p-4">{first_name}</td>
            <td className="p-4">{last_name}</td>
            <td className="p-4">{birth_date}</td>
            <td className="p-4">{status}</td>
            <td className="p-4">{role}</td>
            <td className="p-4 flex gap-1">
                <Link to={`/edit/${id}`}
                    className='bg-blue-600 text-white h-9 flex items-center px-6 rounded'>
                        Edit
                </Link>
                <button 
                    className='bg-red-600 text-white h-9 inline-block px-6 rounded' 
                    onClick={() => dispatch(removeUser(id))}>
                        Remove
                </button>
                
            </td>
        </tr>
    );
}
 
export default TableRaw;