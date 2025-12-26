#!/bin/bash

echo "Starting AffiliateHub React App..."
echo ""

cd "$(dirname "$0")"

if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
    echo ""
fi

echo "Starting development server on http://localhost:3000"
echo "Press Ctrl+C to stop the server"
echo ""

npm start
