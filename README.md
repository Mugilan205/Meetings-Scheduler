# Society Meeting Minutes Keeper

A full-stack web application for managing society meetings, minutes, and member engagement.

## Features

### For Members
- View past meeting minutes with dates, titles, attendees, and decisions
- View upcoming scheduled meetings
- Post feedback and comments on meetings
- Secure authentication and session management

### For Admins
- Schedule new meetings with comprehensive details
- Record and finalize meeting minutes
- View, edit, and delete meeting records
- Send notifications to members about meetings
- Complete meeting management dashboard

## Tech Stack

### Frontend
- **Next.js 14** with App Router
- **React 18** with hooks and Context API
- **Tailwind CSS** for styling
- **JavaScript** (ES6+)

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **bcrypt** for password hashing
- **CORS** for cross-origin requests

## Installation & Setup

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Backend Setup

1. Navigate to the server directory:
\`\`\`bash
cd server
\`\`\`

2. Install dependencies:
\`\`\`bash
npm install
\`\`\`

3. Create environment file:
\`\`\`bash
cp .env.example .env
\`\`\`

4. Update the `.env` file with your configuration:
\`\`\`env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/meeting_keeper
JWT_SECRET=your_very_long_and_secure_jwt_secret_key_here
\`\`\`

5. Start MongoDB service (if running locally):
\`\`\`bash
# On macOS with Homebrew
brew services start mongodb-community

# On Ubuntu/Debian
sudo systemctl start mongod

# On Windows
net start MongoDB
\`\`\`

6. Start the backend server:
\`\`\`bash
# Development mode
npm run dev

# Production mode
npm start
\`\`\`

The backend server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to the root directory and install dependencies:
\`\`\`bash
npm install
\`\`\`

2. Start the development server:
\`\`\`bash
npm run dev
\`\`\`

The frontend will run on `http://localhost:3000`

## API Endpoints

### Authentication Routes
- `POST /api/auth/member/register` - Register new member
- `POST /api/auth/member/login` - Member login
- `POST /api/auth/admin/register` - Register new admin
- `POST /api/auth/admin/login` - Admin login

### Member Routes
- `GET /api/meetings` - View all published meeting minutes
- `GET /api/meetings/upcoming` - View upcoming meetings
- `POST /api/comments` - Post comment on a meeting
- `GET /api/comments/meeting/:meetingId` - Get comments for a meeting

### Admin Routes
- `POST /api/admin/meetings` - Schedule new meeting
- `PUT /api/admin/meetings/:id` - Update meeting minutes
- `DELETE /api/admin/meetings/:id` - Delete meeting record

## Database Models

### User Model
\`\`\`javascript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: String (enum: ['member', 'admin']),
  timestamps: true
}
\`\`\`

### Meeting Model
\`\`\`javascript
{
  title: String (required),
  agenda: String (required),
  date: Date (required),
  time: String (required),
  location: String (required),
  minutes: String,
  attendees: [String],
  decisions: [String],
  status: String (enum: ['scheduled', 'completed', 'cancelled']),
  createdBy: ObjectId (ref: User),
  timestamps: true
}
\`\`\`

### Comment Model
\`\`\`javascript
{
  meetingId: ObjectId (ref: Meeting),
  userId: ObjectId (ref: User),
  content: String (required),
  timestamps: true
}
\`\`\`

### Notification Model
\`\`\`javascript
{
  userId: ObjectId (ref: User),
  message: String (required),
  seen: Boolean (default: false),
  type: String (enum: ['meeting_scheduled', 'meeting_updated', 'meeting_cancelled']),
  timestamps: true
}
\`\`\`

## Project Structure

\`\`\`
society-meeting-keeper/
├── app/                          # Next.js App Router
│   ├── components/              # Reusable React components
│   │   ├── Header.js
│   │   ├── LoginForm.js
│   │   ├── RegisterForm.js
│   │   ├── MeetingCard.js
│   │   └── MeetingForm.js
│   ├── contexts/               # React Context providers
│   │   └── AuthContext.js
│   ├── login/                  # Login page
│   ├── register/               # Registration page
│   ├── member-dashboard/       # Member dashboard
│   ├── admin-dashboard/        # Admin dashboard
│   ├── layout.js              # Root layout
│   ├── page.js                # Home page
│   └── globals.css            # Global styles
├── server/                     # Express.js backend
│   ├── controllers/           # Route controllers
│   │   ├── authController.js
│   │   ├── meetingController.js
│   │   └── commentController.js
│   ├── middleware/            # Custom middleware
│   │   └── auth.js
│   ├── models/               # Mongoose models
│   │   ├── User.js
│   │   ├── Meeting.js
│   │   ├── Comment.js
│   │   └── Notification.js
│   ├── routes/               # API routes
│   │   ├── auth.js
│   │   ├── meetings.js
│   │   └── comments.js
│   ├── server.js             # Express server setup
│   └── package.json          # Backend dependencies
├── package.json              # Frontend dependencies
├── tailwind.config.js        # Tailwind configuration
├── next.config.js           # Next.js configuration
└── README.md                # Project documentation
\`\`\`

## Usage

### For Members
1. Register as a member or login with existing credentials
2. Access the member dashboard to:
   - View past meeting minutes
   - Check upcoming meetings
   - Post comments and feedback

### For Admins
1. Register as an admin or login with admin credentials
2. Access the admin dashboard to:
   - Schedule new meetings
   - Edit existing meetings
   - Record meeting minutes
   - Manage all meeting records

## Security Features

- **JWT Authentication**: Secure token-based authentication
- **Password Hashing**: bcrypt for secure password storage
- **Route Protection**: Middleware-based route protection
- **Role-based Access**: Different access levels for members and admins
- **Input Validation**: Server-side validation for all inputs

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email support@societymeetingkeeper.com or create an issue in the GitHub repository.
