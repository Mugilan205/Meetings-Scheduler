"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import MeetingCard from "../components/MeetingCard"

export default function MemberDashboard() {
  const [meetings, setMeetings] = useState([])
  const [upcomingMeetings, setUpcomingMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("past")

  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (user?.role === "admin") {
      router.push("/admin-dashboard")
      return
    }

    fetchMeetings()
    fetchUpcomingMeetings()
  }, [isAuthenticated, user, router])

  const fetchMeetings = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        "https://meetings-scheduler.onrender.com/api/meetings",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json()
        setMeetings(data)
      }
    } catch (error) {
      console.error("Error fetching meetings:", error)
    }
  }

  const fetchUpcomingMeetings = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        "https://meetings-scheduler.onrender.com/api/meetings/upcoming",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json()
        setUpcomingMeetings(data)
      }
    } catch (error) {
      console.error("Error fetching upcoming meetings:", error)
    } finally {
      setLoading(false)
    }
  }

  const handleComment = async (meetingId, content) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        "https://meetings-scheduler.onrender.com/api/comments",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            meetingId,
            content,
          }),
        }
      );

      if (response.ok) {
        // Optionally refresh meetings or show success message
        console.log("Comment added successfully")
      }
    } catch (error) {
      console.error("Error adding comment:", error)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Member Dashboard</h1>
          <p className="text-gray-600 mt-2">Welcome back, {user?.name}!</p>
        </div>

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("past")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "past"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Past Meetings ({meetings.length})
              </button>
              <button
                onClick={() => setActiveTab("upcoming")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "upcoming"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Upcoming Meetings ({upcomingMeetings.length})
              </button>
            </nav>
          </div>
        </div>

        <div className="space-y-6">
          {activeTab === "past" && (
            <div>
              {meetings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No past meetings found.</p>
                </div>
              ) : (
                meetings.map((meeting) => (
                  <MeetingCard key={meeting._id} meeting={meeting} showComments={true} onComment={handleComment} />
                ))
              )}
            </div>
          )}

          {activeTab === "upcoming" && (
            <div>
              {upcomingMeetings.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500">No upcoming meetings scheduled.</p>
                </div>
              ) : (
                upcomingMeetings.map((meeting) => (
                  <MeetingCard key={meeting._id} meeting={meeting} showComments={false} />
                ))
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
