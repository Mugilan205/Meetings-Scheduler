"use client"

import Link from "next/link"
import { useAuth } from "../contexts/AuthContext"

export default function Header() {
  const { user, logout, isAuthenticated } = useAuth()

  const handleLogout = () => {
    logout()
  }

  return (
    <header className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          Society Meeting Keeper
        </Link>

        <nav className="flex items-center space-x-4">
          {isAuthenticated ? (
            <>
              <span className="text-sm">Welcome, {user?.name}</span>
              <Link
                href={user?.role === "admin" ? "/admin-dashboard" : "/member-dashboard"}
                className="hover:text-blue-200"
              >
                Dashboard
              </Link>
              <button onClick={handleLogout} className="bg-blue-700 hover:bg-blue-800 px-3 py-1 rounded text-sm">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="hover:text-blue-200">
                Login
              </Link>
              <Link href="/register" className="hover:text-blue-200">
                Register
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}
