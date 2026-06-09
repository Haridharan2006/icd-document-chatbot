#!/bin/bash

echo "Starting Backend..."

cd backend
node server.js &
BACKEND_PID=$!

cd ../frontend

echo "Starting Frontend..."

npm run dev &
FRONTEND_PID=$!

echo ""
echo "=============================="
echo "MediCode AI Started"
echo "Backend:  http://localhost:5000"
echo "Frontend: http://localhost:5173"
echo "=============================="

wait