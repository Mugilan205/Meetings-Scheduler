const Comment = require("../models/Comment")

const createComment = async (req, res) => {
  try {
    const comment = await Comment.create({
      ...req.body,
      userId: req.user._id,
    })

    const populatedComment = await Comment.findById(comment._id).populate("userId", "name")

    res.status(201).json(populatedComment)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const getCommentsByMeeting = async (req, res) => {
  try {
    const comments = await Comment.find({ meetingId: req.params.meetingId })
      .populate("userId", "name")
      .sort({ createdAt: -1 })

    res.json(comments)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  createComment,
  getCommentsByMeeting,
}
