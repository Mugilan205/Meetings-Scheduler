const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
require("dotenv").config()

const authRoutes = require("./routes/auth")
const meetingRoutes = require("./routes/meetings")
const commentRoutes = require("./routes/comments")

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Connect to MongoDB
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/society-meeting-app"
mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.log("MongoDB connection error:", err))

// Routes
app.use("/api/auth", authRoutes)
app.use("/api/meetings", meetingRoutes)
app.use("/api/comments", commentRoutes)

// Admin routes
app.use("/api/admin/meetings", meetingRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
