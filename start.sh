#!/bin/bash

echo "======================================"
echo "        MediCode AI Launcher"
echo "======================================"

echo ""
echo "Installing backend dependencies..."

cd backend || exit

npm install

echo ""
echo "Starting backend..."

node server.js &
BACKEND_PID=$!

cd ..

echo ""
echo "Installing frontend dependencies..."

cd frontend || exit

npm install

echo ""
echo "Starting frontend..."

npm run dev &
FRONTEND_PID=$!

cd ..

echo ""
echo "======================================"
echo "Backend  : http://localhost:5000"
echo "Frontend : http://localhost:5173"
echo "======================================"

echo ""
echo "Press Ctrl+C to stop both services."

wait
