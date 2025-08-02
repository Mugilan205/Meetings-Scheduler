"use client"

import Link from "next/link"
import { useAuth } from "./contexts/AuthContext"

export default function HomePage() {
  const { isAuthenticated, user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Society Meeting Keeper</h1>
          <p className="text-xl text-gray-600 mb-12">
            Manage your society meetings, minutes, and member engagement all in one place
          </p>

          {isAuthenticated ? (
            <div className="space-y-4">
              <p className="text-lg text-gray-700">Welcome back, {user?.name}!</p>
              <Link
                href={user?.role === "admin" ? "/admin-dashboard" : "/member-dashboard"}
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Go to Dashboard
              </Link>
            </div>
          ) : (
            <div className="space-x-6">
              <Link
                href="/login"
                className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 px-8 rounded-lg transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
