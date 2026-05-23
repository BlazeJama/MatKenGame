@echo off
REM ============================================================
REM  MatKenGame — one-click publish
REM
REM  Double-click this file after replacing data\vehicles.js with
REM  the file downloaded from the admin page. It commits ONLY that
REM  one file and pushes it to GitHub. The live game updates in
REM  about 30 seconds.
REM ============================================================

REM Run from the folder this .bat lives in, regardless of how it was launched
cd /d "%~dp0"

echo.
echo ============================================
echo   MatKenGame: publish vehicles to game
echo ============================================
echo.

REM Sanity check: are we actually inside a git repo?
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo ERROR: this folder is not a git repository.
  echo Make sure update-game.bat is sitting next to the .git folder.
  echo.
  pause
  exit /b 1
)

REM Has data/vehicles.js actually changed since the last commit?
git diff --quiet HEAD -- data/vehicles.js
if not errorlevel 1 (
  echo No changes detected in data\vehicles.js.
  echo.
  echo Did you remember to replace the file with the one you downloaded
  echo from the admin page? The file lives here:
  echo   %~dp0data\vehicles.js
  echo.
  pause
  exit /b 0
)

REM Build a readable timestamp for the commit message
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value 2^>nul') do set "ldt=%%a"
if defined ldt (
  set "datestamp=%ldt:~0,4%-%ldt:~4,2%-%ldt:~6,2% %ldt:~8,2%:%ldt:~10,2%"
) else (
  set "datestamp=admin update"
)

echo Committing changes...
git commit -m "Update vehicles via admin (%datestamp%)" -- data/vehicles.js
if errorlevel 1 (
  echo.
  echo Commit failed. Check the messages above for details.
  pause
  exit /b 1
)

echo.
echo Pushing to GitHub...
git push
if errorlevel 1 (
  echo.
  echo Push failed. Common causes:
  echo   - No internet connection
  echo   - GitHub credentials need refreshing
  echo   - Someone else pushed a change since you last pulled
  echo.
  pause
  exit /b 1
)

echo.
echo ============================================
echo   Done! The game will update in ~30 seconds:
echo   https://blazejama.github.io/MatKenGame
echo ============================================
echo.
pause
