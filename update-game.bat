@echo off
setlocal EnableExtensions
REM ============================================================
REM  MatKenGame - one-click publish
REM
REM  Double-click this file after extracting the ZIP downloaded
REM  from the admin page. It commits data\vehicles.js AND any
REM  new or changed images in public\assets\images\, then pushes
REM  to GitHub. The live game updates in about 30 seconds.
REM
REM  No need to "Run as administrator" - a normal double-click is
REM  correct, and running elevated can break git's credentials.
REM
REM  STYLE NOTE: this script uses "goto :label" instead of
REM  multi-line "if ... ( ... )" blocks on purpose. Inside a
REM  parenthesised block, an unescaped ) in echo text silently
REM  ends the block and crashes the script with no error shown -
REM  which is exactly what used to make this window vanish.
REM  Keep it label-based, and keep ( ) out of echo text.
REM ============================================================

REM Run from the folder this .bat lives in, regardless of how it was launched
cd /d "%~dp0"

echo.
echo ============================================
echo   MatKenGame: publish vehicles to game
echo ============================================
echo.

REM Sanity check: is git actually available?
echo [1/6] Checking git...
git --version >nul 2>&1
if errorlevel 1 goto :err_nogit

git rev-parse --is-inside-work-tree >nul 2>&1
if errorlevel 1 goto :err_norepo

REM Stage vehicles.js and ALL new/changed images.
REM NOTE: images live in public\assets\images\ - that is the tree Vite
REM copies into dist\ and publishes. The root assets\images\ tree is
REM NOT deployed.
echo [2/6] Staging data\vehicles.js and public\assets\images\...
git add data/vehicles.js public/assets/images/
if errorlevel 1 goto :err_add

REM Check if there is actually anything staged to commit
echo [3/6] Checking for staged changes...
git diff --cached --quiet
if not errorlevel 1 goto :nochanges

REM Show a summary of what will be committed
echo [4/6] Files staged for commit:
git diff --cached --stat
echo.

REM Build a readable timestamp for the commit message.
REM Uses PowerShell because wmic is removed on current Windows builds.
REM If it fails for any reason the default below is used unchanged.
set "datestamp=admin update"
for /f "usebackq tokens=*" %%a in (`powershell -NoProfile -Command "Get-Date -Format 'yyyy-MM-dd HH:mm'"`) do set "datestamp=%%a"

echo [5/6] Committing changes...
git commit -m "Update vehicles + images via admin (%datestamp%)"
if errorlevel 1 goto :err_commit

echo.
echo [6/6] Pushing to GitHub...
git push
if errorlevel 1 goto :err_push

echo.
echo ============================================
echo   Done! The game will update in ~30 seconds:
echo   https://blazejama.github.io/MatKenGame
echo ============================================
goto :end


:err_nogit
echo.
echo ERROR: git was not found on your PATH.
echo Install Git for Windows, or open "Git Bash" and run the
echo commands manually from there.
goto :end

:err_norepo
echo.
echo ERROR: this folder is not a git repository.
echo Make sure update-game.bat is sitting next to the .git folder.
goto :end

:err_add
echo.
echo ERROR: git add failed. A file may be locked by another program
echo such as antivirus, an Explorer preview pane, or an image viewer.
echo Close anything touching public\assets\images\ and try again.
goto :end

:nochanges
echo.
echo No changes detected in data\vehicles.js or public\assets\images\.
echo.
echo Did you remember to extract the ZIP you downloaded from the
echo admin page into this folder? It should place files here:
echo   %~dp0data\vehicles.js
echo   %~dp0public\assets\images\
goto :end

:err_commit
echo.
echo ERROR: commit failed. Check the messages above for details.
echo Files remain staged so you can fix the issue and re-run this script.
goto :end

:err_push
echo.
echo Push failed. Common causes:
echo   - No internet connection
echo   - GitHub credentials need refreshing
echo   - Someone else pushed a change since you last pulled
goto :end


:end
echo.
pause
