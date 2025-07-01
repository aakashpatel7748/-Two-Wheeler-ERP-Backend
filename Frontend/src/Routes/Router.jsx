import { Routes, Route, createBrowserRouter } from 'react-router-dom'
import Home from "../pages/Home.jsx"
import Signup from '../components/Signup.jsx'
import Signin from '../components/Signin.jsx'
import AdminDashboard from '../pages/AdminDashboard.jsx'
import ProtectiveRoute from './ProtectiveRoute.jsx'
import App from '../App.jsx'
import CompanyMaster from '../pages/CompanyMaster.jsx'

const Router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/signin",
                element: <Signin />
            },
            {
                path: "/signup",
                element: <Signup />
            },
            {
                path: "/admin",
                element: (
                    <ProtectiveRoute>
                        <AdminDashboard />
                    </ProtectiveRoute>
                )
            },
            {
                path: "/company",
                element: (
                    <ProtectiveRoute><CompanyMaster /></ProtectiveRoute>
                )
            }

        ]
    }
])

export default Router;