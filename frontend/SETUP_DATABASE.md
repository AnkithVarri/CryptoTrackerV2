# Database Setup Instructions

## Step 1: Update Database Credentials

Edit the `backend.env` file and update with your MySQL credentials:

```bash
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password_here
DB_NAME=cryptotracker
JWT_SECRET=your-secret-key-change-this-in-production-make-it-long-and-random
PORT=5001
```

**Important:** Replace `your_mysql_password_here` with your actual MySQL root password.

## Step 2: Create the Database and Table

### Option A: Using MySQL Command Line (if you have password)

```bash
cd "/Users/ankithvarri/Leetcode Grind/Personal Project Grind/CryptoTrackerV2/frontend"
mysql -u root -p < create_users_table.sql
```

When prompted, enter your MySQL password.

### Option B: Using MySQL Command Line (if no password)

```bash
cd "/Users/ankithvarri/Leetcode Grind/Personal Project Grind/CryptoTrackerV2/frontend"
mysql -u root < create_users_table.sql
```

### Option C: Manual Setup in MySQL

1. Open MySQL (or MySQL Workbench, or phpMyAdmin)
2. Run these SQL commands:

```sql
CREATE DATABASE IF NOT EXISTS cryptotracker;

USE cryptotracker;

CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_email ON users(email);
CREATE INDEX idx_username ON users(username);
```

## Step 3: Verify Database Connection

After updating `backend.env` and creating the database, restart your server:

```bash
cd "/Users/ankithvarri/Leetcode Grind/Personal Project Grind/CryptoTrackerV2/frontend"
npm run dev
```

You should see:
- ✅ `Database connected successfully` - Everything is working!
- ❌ `Database connection failed` - Check your credentials in `backend.env`

## Troubleshooting

### "Access denied for user 'root'@'localhost'"
- Your MySQL password is incorrect in `backend.env`
- Update `DB_PASSWORD` in `backend.env` with the correct password

### "Unknown database 'cryptotracker'"
- The database doesn't exist
- Run the SQL commands from Step 2 to create it

### "Table 'users' doesn't exist"
- The table wasn't created
- Run the SQL commands from Step 2 to create it
