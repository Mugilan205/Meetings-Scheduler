"use client"

import { useState, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { useRouter } from "next/navigation"
import MeetingCard from "../components/MeetingCard"
import MeetingForm from "../components/MeetingForm"

export default function AdminDashboard() {
  const [meetings, setMeetings] = useState([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [editingMeeting, setEditingMeeting] = useState(null)
  const [activeTab, setActiveTab] = useState("all")

  const { user, isAuthenticated } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login")
      return
    }

    if (user?.role !== "admin") {
      router.push("/member-dashboard")
      return
    }

    fetchMeetings()
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
    } finally {
      setLoading(false)
    }
  }

  const handleCreateMeeting = async (meetingData) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        "https://meetings-scheduler.onrender.com/api/admin/meetings",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(meetingData),
        }
      );

      if (response.ok) {
        setShowForm(false)
        fetchMeetings()
      }
    } catch (error) {
      console.error("Error creating meeting:", error)
    }
  }

  const handleUpdateMeeting = async (meetingData) => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `https://meetings-scheduler.onrender.com/api/admin/meetings/${editingMeeting._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(meetingData),
        }
      );

      if (response.ok) {
        setEditingMeeting(null)
        fetchMeetings()
      }
    } catch (error) {
      console.error("Error updating meeting:", error)
    }
  }

  const handleDeleteMeeting = async (meetingId) => {
    if (!confirm("Are you sure you want to delete this meeting?")) {
      return
    }

    try {
      const token = localStorage.getItem("token")
      const response = await fetch(
        `https://meetings-scheduler.onrender.com/admin/meetings/${meetingId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchMeetings()
      }
    } catch (error) {
      console.error("Error deleting meeting:", error)
    }
  }

  const filteredMeetings = meetings.filter((meeting) => {
    if (activeTab === "all") return true
    return meeting.status === activeTab
  })

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
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-2">Manage meetings and records</p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium"
          >
            Schedule New Meeting
          </button>
        </div>

        {(showForm || editingMeeting) && (
          <div className="mb-8 bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">{editingMeeting ? "Edit Meeting" : "Schedule New Meeting"}</h2>
            <MeetingForm
              onSubmit={editingMeeting ? handleUpdateMeeting : handleCreateMeeting}
              initialData={editingMeeting}
              onCancel={() => {
                setShowForm(false)
                setEditingMeeting(null)
              }}
            />
          </div>
        )}

        <div className="mb-6">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab("all")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "all"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                All Meetings ({meetings.length})
              </button>
              <button
                onClick={() => setActiveTab("scheduled")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "scheduled"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Scheduled
              </button>
              <button
                onClick={() => setActiveTab("completed")}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "completed"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Completed
              </button>
            </nav>
          </div>
        </div>

        <div className="space-y-6">
          {filteredMeetings.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500">No meetings found.</p>
            </div>
          ) : (
            filteredMeetings.map((meeting) => (
              <div key={meeting._id} className="relative">
                <MeetingCard meeting={meeting} />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <button
                    onClick={() => setEditingMeeting(meeting)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMeeting(meeting._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
