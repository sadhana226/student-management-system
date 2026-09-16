@echo off
echo ========================================================
echo Starting Student Management System - Spring Boot Backend
echo ========================================================
cd backend

if exist mvnw.cmd (
    call mvnw.cmd spring-boot:run
) else (
    echo Starting with installed Java/Maven...
    call mvn spring-boot:run
)
pause
