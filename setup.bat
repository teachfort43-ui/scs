@echo off
echo ========================================
echo SchoolPro - Setup Script
echo ========================================
echo.

echo Installing Backend Dependencies...
cd backend
npm install

echo.
echo Installing Frontend Dependencies...
cd ..\frontend
npm install

echo.
echo ========================================
echo Setup Complete!
echo ========================================
echo.
echo To run the project:
echo.
echo Option 1: Run both (two separate terminals)
echo   1. Run: run-backend.bat
echo   2. Run: run-frontend.bat
echo.
echo Option 2: Manual setup
echo   Backend: cd backend ^&^& npm run dev
echo   Frontend: cd frontend ^&^& npm start
echo.
pause
