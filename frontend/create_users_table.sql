-- Create users table for authentication
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

-- Create index on email for faster lookups
-- Note: If you get "Duplicate key name" errors, the indexes already exist - that's fine!
-- You can safely ignore those errors and continue using the database.
