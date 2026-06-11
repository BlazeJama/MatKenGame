@echo off
REM ============================================================
REM  MatKenGame — one-click publish
REM
REM  Double-click this file after extracting the ZIP downloaded
REM  from the admin page. It commits data\vehicles.js AND any
REM  new or changed images in assets\images\, then pushes to
REM  GitHub. The live game updates in about 30 seconds.
REM ============================================================

REM Run from the folder this .bat lives in, regardless of how it was launched
cd /d "%~dp0"

echo.
echo ============================================
echo   MatKenGame: publish vehicles to game
echo ============================================
echo.

REM Sanity check: are we actually inside a git repo?
echo [1/6] Checking git repo...
git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 (
  echo ERROR: this folder is not a git repository.
  echo Make sure Update-game.bat is sitting next to the .git folder.
  echo.
  pause
  exit /b 1
)

REM Stage vehicles.js and ALL new/changed images
echo [2/6] Staging data\vehicles.js and assets\images\...
git add data/vehicles.js assets/images/
if errorlevel 1 (
  echo.
  echo ERROR: git add failed. A file may be locked by another program
  echo (antivirus, file explorer preview, image viewer). Close anything
  echo that might be touching assets\images\ and try again.
  echo.
  pause
  exit /b 1
)

REM Check if there is actually anything staged to commit
echo [3/6] Checking for staged changes...
git diff --cached --quiet
if not errorlevel 1 (
  echo No changes detected in data\vehicles.js or assets\images\.
  echo.
  echo Did you remember to extract the ZIP you downloaded from the
  echo admin page into this folder? It should place files here:
  echo   %~dp0data\vehicles.js
  echo   %~dp0assets\images\
  echo.
  pause
  exit /b 0
)

REM Show a summary of what will be committed
echo [4/6] Files staged for commit:
git diff --cached --stat
echo.

REM Build a readable timestamp for the commit message
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value 2^>nul') do set "ldt=%%a"
if defined ldt (
  set "datestamp=%ldt:~0,4%-%ldt:~4,2%-%ldt:~6,2% %ldt:~8,2%:%ldt:~10,2%"
) else (
  set "datestamp=admin update"
)

echo [5/6] Committing changes...
git commit -m "Update vehicles + images via admin (%datestamp%)"
if errorlevel 1 (
  echo.
  echo ERROR: commit failed. Check the messages above for details.
  echo Files remain staged so you can fix the issue and re-run this script.
  pause
  exit /b 1
)

echo.
echo [6/6] Pushing to GitHub...
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
