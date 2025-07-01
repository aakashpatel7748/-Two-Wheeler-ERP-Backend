import './App.css'
import { Outlet } from 'react-router-dom'
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import { useSelector } from 'react-redux'

function App() {

// const { status, admin } = useSelector((state) => state.admin)

// console.log("status(pin):", status)
// console.log("admin(pin):", admin)

  return (
    
      <div className="min-h-screen flex flex-col bg-gray-100 text-gray-800">
      <Header />

      <main className="flex-1">
        <Outlet />
      </main>

      <Footer />
    </div>
    
  )
}

export default App
