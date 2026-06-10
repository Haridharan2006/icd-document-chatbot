@echo off

echo ======================================
echo        MediCode AI Launcher
echo ======================================

echo.
echo Installing backend dependencies...
cd backend
call npm install

echo.
echo Starting backend...
start "Backend" cmd /k "node server.js"

cd ..

echo.
echo Installing frontend dependencies...
cd frontend
call npm install

echo.
echo Starting frontend...
start "Frontend" cmd /k "npm run dev"

cd ..

echo.
echo ======================================
echo Backend  : http://localhost:5000
echo Frontend : http://localhost:5173
echo ======================================

pause
