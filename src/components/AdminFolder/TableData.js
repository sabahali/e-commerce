import React, { useState } from 'react'
import { useUpdateRoleMutation, useDeleteUserMutation } from '../../features/User/userDataApiSlice'

const TableData = ({ user, setStatus }) => {
    const [role, setRole] = useState(user.role)
    const [update, { status, isError, isSuccess }] = useUpdateRoleMutation()
    const [deleteuser] = useDeleteUserMutation()

    const handleDeleteUSer = async (id) => {
        alert('Deleting')
        try {
            const response = await deleteuser(id);
            // console.log(response)
            // alert('Data Deleted Successfully')
            
        } catch (err) {
            console.log(err)
            if (err.originalStatus === 405) {
                alert('Not Allowed')

            } else if (err.originalStatus === 200) {
                alert('Data deleted Successfully')
            }
        } 
    }
    const handleRole = (e) => {
        const role = e.target.value;
        setRole(role)

    }
    const updateRole = async () => {

        alert('Updating')
        try {
            const response = await update({ role, id: user._id }).unwrap();
            

        } catch (err) {
            if (err.originalStatus === 405) {
                alert('Not Allowed')

            } else if (err.originalStatus === 200) {
                alert('Data Updated Successfully')
            }

        }
    }
    return (
        <tr>
            <th scope='row'>{(user._id).slice(3, 6)}</th>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td><select
                value={role}
                onChange={(e) => handleRole(e)}
            >

                <option value='admin'>Admin</option>
                <option value='user'>User</option>
            </select>
            </td>
            <td><button className='btn btn-danger' onClick={() => handleDeleteUSer(user._id)}>Delete User</button></td>
            <td><button className='btn btn-info' onClick={updateRole}>Update Role</button></td>
        </tr>
    )
}

export default TableData