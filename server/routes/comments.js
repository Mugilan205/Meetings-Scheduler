const express = require("express")
const { createComment, getCommentsByMeeting } = require("../controllers/commentController")
const { auth } = require("../middleware/auth")

const router = express.Router()

router.post("/", auth, createComment)
router.get("/meeting/:meetingId", auth, getCommentsByMeeting)

module.exports = router
