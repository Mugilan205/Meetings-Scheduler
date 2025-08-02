const express = require("express")
const {
  getAllMeetings,
  getUpcomingMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
} = require("../controllers/meetingController")
const { auth, adminAuth } = require("../middleware/auth")

const router = express.Router()

// Public routes (for members)
router.get("/", auth, getAllMeetings)
router.get("/upcoming", auth, getUpcomingMeetings)

// Admin routes
router.post("/", adminAuth, createMeeting)
router.put("/:id", adminAuth, updateMeeting)
router.delete("/:id", adminAuth, deleteMeeting)

module.exports = router
