import React from 'react'
import { useDispatch } from 'react-redux'
import { asyncLogoutAdmin } from '../../store/actions/adminAction';

const LogoutBtn = () => {
    const dispatch = useDispatch();

    const logoutHandler = () => {

        dispatch(asyncLogoutAdmin())

    }
    
    return (
        <button
            className='inline-block px-6 py-2 duration-200 hover:bg-blue-200 rounded-full'
            onClick={() => logoutHandler()}
        >Logout
        </button>
    )
}

export default LogoutBtn