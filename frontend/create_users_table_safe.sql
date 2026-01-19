-- Create users table for authentication (safe version - handles existing objects)
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

-- Create indexes (will fail silently if they already exist, which is fine)
-- You can ignore "Duplicate key name" errors - it just means the indexes already exist
-- The table is ready to use either way!
