@echo off
title Entrailism Generator
color 02
cls
echo.
echo What shall the map be called?
set /p name=
echo.
echo And the name of the music file? (Must be in current directory, and in WAV format)
set /p music=
echo.
echo Please enter the BPM of the song
set /p bpm=
echo.
echo Select difficulty (easy, hard, or harder)
set /p difficulty=
echo.
echo Random arc placement? (true or false)
set /p random=
node index.js --name %name% --music %music% --bpm %bpm% --difficulty %difficulty% --random %random%
echo.
pause
exit