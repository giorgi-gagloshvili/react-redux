import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getUsers } from '../redux/usersSlice'
import TableRow from '../components/TableRaw'
import Filters from './../components/Filters'
import AddUserForm from './../components/AddUserForm'
import _ from 'lodash'

const Table = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.users.users)

    const [filters, setFilters] = useState({searchString: '', sort: {title: '', order: 'asc'}})

    const filterData = () => {
        const filterByString =  filters.searchString 
            ? users.filter(user => user.first_name.toLowerCase().indexOf(filters.searchString.toLowerCase()) !== -1)
            : users
        
        return _.orderBy(filterByString, [filters.sort.title], [filters.sort.order])
    }

    const sortUsers = (title) => {
        if(title === filters.sort.title && filters.sort.order === 'asc') {
            setFilters({...filters, sort: {title: title, order: 'desc'}})
            return
        }
        
        setFilters({...filters, sort: {title: title, order: 'asc'}})
        
    }

    useEffect(() => {
        const allUsers = () => {
            dispatch(getUsers())
        }
        allUsers()

    }, [dispatch])

    return (
        <>
            <Filters 
                setFilters={setFilters}
                filters={filters}
            />
            <table className="table-fixed border-collapse border w-full">
                <thead>
                    <tr>
                        <th className="border border-slate-300 p-4 text-left">Firstname</th>
                        <th className="border border-slate-300 p-4 text-left">Lastname</th>
                        <th className="border border-slate-300 p-4 text-left">Birth Date</th>
                        <th className="border border-slate-300 p-4 text-left" onClick={() => sortUsers('status')}>Status</th>
                        <th className="border border-slate-300 p-4 text-left" onClick={() => sortUsers('role')}>Role</th>
                        <th className="border border-slate-300 p-4 text-left">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    { users && filterData().map(user => (
                        <TableRow key={user.id} {...user} />
                    )) }
                </tbody>
            </table>

            <AddUserForm />
        </>
    )
}

export default Table