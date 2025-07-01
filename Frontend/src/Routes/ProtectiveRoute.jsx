import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

const ProtectiveRoute = ({ children }) => {
    const adminActive = useSelector((state) => state.creatAdmin.status)
    return adminActive ? children : <Navigate to="/signin" />
}

export default ProtectiveRoute