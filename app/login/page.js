"use client"

import { useState } from "react"
import Link from "next/link"
import LoginForm from "../components/LoginForm"

export default function LoginPage() {
  const [userType, setUserType] = useState("member")

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>

        <div className="mt-4 flex justify-center space-x-4">
          <button
            onClick={() => setUserType("member")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              userType === "member" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Member
          </button>
          <button
            onClick={() => setUserType("admin")}
            className={`px-4 py-2 rounded-md text-sm font-medium ${
              userType === "admin" ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Admin
          </button>
        </div>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <LoginForm userType={userType} />

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Don't have an account?</span>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/register"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-blue-600 bg-white hover:bg-gray-50 border-blue-600"
              >
                Create new account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
