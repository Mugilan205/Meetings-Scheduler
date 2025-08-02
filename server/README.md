# Society Meeting App - Server

## Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or cloud)

### Installation
1. Install dependencies:
   ```bash
   npm install
   ```

### Environment Variables
Create a `.env` file in the server directory with the following variables:

```env
MONGODB_URI=mongodb://localhost:27017/society-meeting-app
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
```

### MongoDB Setup
You have two options:

#### Option 1: Local MongoDB
1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/society-meeting-app`

#### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string
4. Replace the MONGODB_URI in your .env file

### Running the Server
```bash
npm start
# or for development with auto-restart
nodemon server.js
```

The server will run on port 5000 by default. 