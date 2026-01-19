-- Safe database setup script
-- This script creates the database and table, and handles existing objects gracefully

CREATE DATABASE IF NOT EXISTS cryptotracker;

USE cryptotracker;

-- Create the users table (will not error if it already exists)
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Try to create indexes (may fail if they exist, but that's okay)
-- If you see "Duplicate key name" errors, just ignore them - the indexes already exist!
