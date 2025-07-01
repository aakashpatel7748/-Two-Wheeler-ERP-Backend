import React from 'react'
import { Link } from 'react-router-dom'

const AdminDashboard = () => {
  const links = [
    { name: "Company Master", path: "/company" },
    { name: "Model Master", path: "/model" },
    { name: "Customer Master", path: "/customer" },
    { name: "Purchase Stock", path: "/purchase" },
    { name: "Current Stock", path: "/stock" },
    { name: "Vehicle Sales", path: "/sales" },
  ]

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <h1 className='text-3xl font-bold mb-6'>Admin Dashboard</h1>
      <div className='grid grid-cols-2 gap-4'>
        {links.map((item) => (
          <Link
            key={item.name}
            to={item.path}
            className='bg-blue-100 p-4 rounded shadow hover:bg-blue-200 transition-all'
          >
            {item.name}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default AdminDashboard
