@echo off

echo Starting Backend...
start cmd /k "cd backend && node server.js"

timeout /t 2 > nul

echo Starting Frontend...
start cmd /k "cd frontend && npm run dev"

echo.
echo ==================================
echo MediCode AI Started Successfully
echo Backend : http://localhost:5000
echo Frontend: http://localhost:5173
echo ==================================

pause