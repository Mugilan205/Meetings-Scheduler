const User = require("../models/User")
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
  const jwtSecret = process.env.JWT_SECRET || "your-super-secret-jwt-key-change-this-in-production"
  return jwt.sign({ id }, jwtSecret, { expiresIn: "30d" })
}

const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body

    const userExists = await User.findOne({ email })
    if (userExists) {
      return res.status(400).json({ message: "User already exists" })
    }

    const user = await User.create({
      name,
      email,
      password,
      role: role || "member",
    })

    const token = generateToken(user._id)

    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" })
    }

    const token = generateToken(user._id)

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      token,
    })
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
}

module.exports = {
  registerUser,
  loginUser,
}
