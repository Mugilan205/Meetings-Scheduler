"use client"

import { useState } from "react"

export default function MeetingCard({ meeting, showComments = false, onComment }) {
  const [comment, setComment] = useState("")
  const [showCommentForm, setShowCommentForm] = useState(false)

  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    if (comment.trim() && onComment) {
      await onComment(meeting._id, comment)
      setComment("")
      setShowCommentForm(false)
    }
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-4">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800">{meeting.title}</h3>
        <span
          className={`px-2 py-1 rounded text-xs font-medium ${
            meeting.status === "completed"
              ? "bg-green-100 text-green-800"
              : meeting.status === "scheduled"
                ? "bg-blue-100 text-blue-800"
                : "bg-red-100 text-red-800"
          }`}
        >
          {meeting.status}
        </span>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>
          <strong>Date:</strong> {formatDate(meeting.date)}
        </p>
        <p>
          <strong>Time:</strong> {meeting.time}
        </p>
        <p>
          <strong>Location:</strong> {meeting.location}
        </p>
        {meeting.attendees && meeting.attendees.length > 0 && (
          <p>
            <strong>Attendees:</strong> {meeting.attendees.join(", ")}
          </p>
        )}
      </div>

      <div className="mb-4">
        <h4 className="font-medium text-gray-800 mb-2">Agenda:</h4>
        <p className="text-gray-600 text-sm">{meeting.agenda}</p>
      </div>

      {meeting.minutes && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Minutes:</h4>
          <p className="text-gray-600 text-sm">{meeting.minutes}</p>
        </div>
      )}

      {meeting.decisions && meeting.decisions.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-800 mb-2">Decisions:</h4>
          <ul className="list-disc list-inside text-gray-600 text-sm">
            {meeting.decisions.map((decision, index) => (
              <li key={index}>{decision}</li>
            ))}
          </ul>
        </div>
      )}

      {showComments && (
        <div className="border-t pt-4">
          <button
            onClick={() => setShowCommentForm(!showCommentForm)}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium mb-2"
          >
            Add Comment
          </button>

          {showCommentForm && (
            <form onSubmit={handleCommentSubmit} className="mt-2">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add your comment..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                rows="3"
              />
              <div className="flex justify-end space-x-2 mt-2">
                <button
                  type="button"
                  onClick={() => setShowCommentForm(false)}
                  className="px-3 py-1 text-sm text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button type="submit" className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700">
                  Submit
                </button>
              </div>
            </form>
          )}
        </div>
      )}
    </div>
  )
}
