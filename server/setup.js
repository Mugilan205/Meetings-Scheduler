const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envContent = `MONGODB_URI=mongodb://localhost:27017/society-meeting-app
PORT=5000
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
`;

if (!fs.existsSync(envPath)) {
  fs.writeFileSync(envPath, envContent);
  console.log('✅ .env file created successfully!');
  console.log('📝 Please update the JWT_SECRET with a secure random string for production.');
} else {
  console.log('⚠️  .env file already exists. Skipping creation.');
}

console.log('\n🚀 To start the server:');
console.log('   npm install');
console.log('   nodemon server.js');
console.log('\n📋 Make sure MongoDB is running on localhost:27017'); 