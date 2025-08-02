const Meeting = require("../models/Meeting")
const Notification = require("../models/Notification")
const User = require("../models/User")

const getAllMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({ status: "completed" }).populate("createdBy", "name").sort({ date: -1 })
    res.json(meetings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const getUpcomingMeetings = async (req, res) => {
  try {
    const meetings = await Meeting.find({
      status: "scheduled",
      date: { $gte: new Date() },
    })
      .populate("createdBy", "name")
      .sort({ date: 1 })
    res.json(meetings)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

const createMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.create({
      ...req.body,
      createdBy: req.user._id,
    })

    // Create notifications for all members
    const members = await User.find({ role: "member" })
    const notifications = members.map((member) => ({
      userId: member._id,
      message: `New meeting scheduled: ${meeting.title}`,
      type: "meeting_scheduled",
    }))

    await Notification.insertMany(notifications)

    res.status(201).json(meeting)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const updateMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndUpdate(req.params.id, req.body, { new: true })

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" })
    }

    res.json(meeting)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const deleteMeeting = async (req, res) => {
  try {
    const meeting = await Meeting.findByIdAndDelete(req.params.id)

    if (!meeting) {
      return res.status(404).json({ message: "Meeting not found" })
    }

    res.json({ message: "Meeting deleted successfully" })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
}

module.exports = {
  getAllMeetings,
  getUpcomingMeetings,
  createMeeting,
  updateMeeting,
  deleteMeeting,
}
