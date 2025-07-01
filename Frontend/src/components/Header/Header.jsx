import React from 'react'
import { useSelector } from 'react-redux'
import Container from '../container/Container'
import { Link, useNavigate } from 'react-router-dom'
import LogoutBtn from './LogoutBtn'

const Header = () => {
  const adminActive = useSelector((state) => state.creatAdmin.status)
  const navigate = useNavigate();

  const navItem = [
    {
      name: "Home",
      status: true,
      route: "/"
    },
    {
      name: "Signin",
      status: !adminActive,
      route: "/signin"
    },
    {
      name: "Signup",
      status: !adminActive,
      route: "/signup"
    },


  ]

  return (
     <header className="bg-white shadow-sm border-b">
      <Container>
        <nav className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="text-xl font-bold text-blue-600 tracking-wide">
            TwoWheeler<span className="text-gray-700">ERP</span>
          </Link>

          {/* Nav Items */}
          <ul className="flex items-center gap-4">
            {navItem.map((item) =>
              item.status ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.route)}
                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {adminActive && (
              <>
                <li>
                  <button
                    onClick={() => navigate("/admin")}
                    className="text-gray-700 hover:text-blue-600 transition font-medium"
                  >
                    Admin Panel
                  </button>
                </li>
                <li>
                  <LogoutBtn />
                </li>
              </>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  )
}

export default Header