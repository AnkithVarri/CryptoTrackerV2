# CryptoTrackerV2

A modern, glassmorphic cryptocurrency tracking application with real-time data visualization and user authentication.

## Features

- 🔐 **User Authentication** - Secure registration and login with JWT tokens
- 🎨 **Glassmorphic UI** - Beautiful, modern design with backdrop blur effects
- 📊 **Crypto Tracking** - Real-time cryptocurrency price tracking
- ✨ **Smooth Animations** - Scroll-triggered animations and transitions
- 🔒 **Secure** - Password hashing with bcrypt, JWT authentication

## Tech Stack

### Frontend
- React 19
- Vite
- Tailwind CSS
- Lucide React (Icons)
- Axios

### Backend
- Node.js
- Express.js
- MySQL
- JWT (jsonwebtoken)
- bcryptjs

## Setup Instructions

### Prerequisites
- Node.js (v18+)
- MySQL
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd CryptoTrackerV2
   ```

2. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

3. **Set up the database**
   
   Create a `backend.env` file in the `frontend` directory:
   ```env
   DB_HOST=localhost
   DB_USER=your_mysql_username
   DB_PASSWORD=your_mysql_password
   DB_NAME=cryptotracker
   JWT_SECRET=your-secret-key-change-this-in-production
   PORT=5001
   ```

4. **Create the database and table**
   ```bash
   mysql -u root -p < create_users_table.sql
   ```

5. **Start the backend server**
   ```bash
   npm run dev
   ```
   The server will run on `http://localhost:5001`

6. **Start the frontend (in a new terminal)**
   ```bash
   npm run frontend
   ```
   The app will open at `http://localhost:5173`

## Project Structure

```
CryptoTrackerV2/
├── frontend/
│   ├── app.jsx          # Main React component
│   ├── main.jsx         # React entry point
│   ├── server.js        # Express backend server
│   ├── db.js            # Database connection
│   ├── index.html       # HTML template
│   ├── index.css        # Global styles
│   ├── vite.config.js   # Vite configuration
│   └── package.json     # Dependencies
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/verify` - Verify JWT token

## Environment Variables

Create a `backend.env` file with:
- `DB_HOST` - MySQL host
- `DB_USER` - MySQL username
- `DB_PASSWORD` - MySQL password
- `DB_NAME` - Database name
- `JWT_SECRET` - Secret key for JWT tokens
- `PORT` - Server port (default: 5001)

## Notes

- Make sure MySQL is running before starting the server
- The frontend runs on port 5173 (Vite default)
- The backend runs on port 5001 (to avoid conflicts with macOS AirPlay on port 5000)

## License

MIT
