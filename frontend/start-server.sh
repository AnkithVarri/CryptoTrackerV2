#!/bin/bash

cd "$(dirname "$0")"

echo "🚀 Starting CryptoV2 Backend Server..."
echo ""

# Check if port 5000 is in use
if lsof -ti:5000 > /dev/null 2>&1; then
    echo "⚠️  Port 5000 is already in use. Killing existing processes..."
    lsof -ti:5000 | xargs kill -9 2>/dev/null
    sleep 1
fi

echo "📦 Starting server..."
echo ""

# Start the server
node server.js
