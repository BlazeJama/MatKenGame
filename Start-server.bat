@echo off
REM ============================================================
REM  MatKenGame — local development server
REM
REM  Double-click to serve the game at http://localhost:8000
REM  Keep this window open while working locally.
REM  Press Ctrl+C to stop the server.
REM ============================================================

cd /d "%~dp0"

echo.
echo ============================================
echo   MatKenGame: local development server
echo ============================================
echo.
echo   Game:   http://localhost:8000
echo   Admin:  http://localhost:8000/admin/
echo.
echo   Press Ctrl+C to stop.
echo ============================================
echo.

python -m http.server 8000
