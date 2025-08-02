const express = require("express")
const { registerUser, loginUser } = require("../controllers/authController")

const router = express.Router()

// Member routes
router.post("/member/register", registerUser)
router.post("/member/login", loginUser)

// Admin routes
router.post(
  "/admin/register",
  (req, res, next) => {
    req.body.role = "admin"
    next()
  },
  registerUser,
)

router.post("/admin/login", loginUser)

module.exports = router
