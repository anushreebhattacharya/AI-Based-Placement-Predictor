import React from 'react'
import Logo from '../Assets/Logo.jpg'
import { Link } from 'react-router-dom'
import { UserCircle } from 'lucide-react'

const Navbar = () => {
  const isLoggedIn = !!localStorage.getItem('token')

  return (
    <nav className="h-20 bg-white border-b border-gray-200 shadow-sm px-12 lg:px-16 flex items-center justify-between">

      
      <div className="flex items-center">
        <img
          src={Logo}
          alt="Logo"
          className="w-12 h-12 object-contain"
        />

        <div className="flex flex-col leading-none ml-3">
          <span className="text-2xl font-bold text-[#0F2A35]">
            Placement
          </span>

          <span className="text-2xl font-bold text-[#0F2A35]">
            Predictor
          </span>
        </div>
      </div>

      
      <div className="flex items-center">
        {isLoggedIn ? (
          <Link to="/profile">
            <UserCircle
              size={32}
              className="text-[#0D9488]"
            />
          </Link>
        ) : (
          <div className="flex items-center gap-4">
            <Link
              to="/login"
              className="h-10 w-24 rounded-xl bg-[#0D9488] text-white font-semibold shadow-md hover:bg-[#0B7A6E] transition flex items-center justify-center"
            >
              Login
            </Link>

            <Link
              to="/register"
              className="h-10 w-24 rounded-xl bg-[#0D9488] text-white font-semibold shadow-md hover:bg-[#0B7A6E] transition flex items-center justify-center"
            >
              Register
            </Link>
          </div>
        )}
      </div>

    </nav>
  )
}

export default Navbar