@echo off
setlocal enabledelayedexpansion

:: Windows CMD requires a specific escape character for ANSI colors
set "ESC= "
:: Note: To create the ESC character above, in most editors you press Ctrl+[
:: If that doesn't work, we use the standard fallback below:
for /F "tokens=1,2 delims=#" %%a in ('"prompt #$H#$E# & echo on & for %%b in (1) do rem"') do set "ESC=%%b"

:: Colors
set "GREEN=%ESC%[0;32m"
set "YELLOW=%ESC%[1;33m"
set "NC=%ESC%[0m"

echo %NC%╔════════════════════════════════════════════════════════╗
echo ║   Bearfit Development Launcher (Auto-Setup Mode)       ║
echo ╚════════════════════════════════════════════════════════╝

:: Auto-create backend .env if missing
if not exist "backend\.env" (
    echo %YELLOW%⚠️  backend/.env not found. Creating...%NC%
    (
        echo DATABASE_URL=postgres://517ad6be03b766c898c174078fd5fc40df4e1837529c3d4ab17ff25da8d23425:sk_ToL0a-qeuyPoD2eKGywxJ@db.prisma.io:5432/postgres?sslmode=require
        echo REDIS_URL=redis://redis:6379
        echo JWT_ACCESS_SECRET=8793625873f1018710215325b6b85e208b847b0cfdb08b5798ebca5bc8e01d3ccfa9c0193ec2fc9812dcbea79e06a07cddb611c386b6365eecd7e06b8b2e993f
        echo JWT_REFRESH_SECRET=2d83a47e85ab010bd46a2345d5775c32a81da30379379f5978e83eec79769463d2afcbbc7d4e66b4e5d14af7d823386754ee40e074492e5cbd5fd72c195ba157
        echo JWT_ACCESS_EXPIRES_IN=15m
        echo JWT_REFRESH_EXPIRES_IN=7d
        echo PORT=3001
        echo NODE_ENV=development
    ) > backend\.env
    echo %GREEN%✅ backend/.env created%NC%
)

:: Detect local IP address (Windows equivalent of hostname -I)
set "IP_ADDR=localhost"
for /f "tokens=2 delims=:" %%a in ('ipconfig ^| findstr /R /C:"IPv4 Address"') do (
    set "temp_ip=%%a"
    :: Remove leading space
    set "IP_ADDR=!temp_ip:~1!"
    :: Use the first one found and exit loop
    goto :found_ip
)

:found_ip
if "%IP_ADDR%"=="localhost" (
    echo Could not detect local IP. Falling back to localhost.
) else (
    echo %GREEN%Detected LAN IP: !IP_ADDR!%NC%
)

:: Set the API URL for the current session
set "EXPO_PUBLIC_API_URL=http://!IP_ADDR!:3001/api"
set "REACT_NATIVE_PACKAGER_HOSTNAME=!IP_ADDR!"

echo %YELLOW%🚀 Injecting API URL: !EXPO_PUBLIC_API_URL!%NC%

echo Starting Docker containers...
:: Use --build to ensure the frontend image bakes in the NEW IP address
docker-compose up --build -d

echo Waiting for services to be ready...
timeout /t 5 /nobreak > nul

echo Syncing Prisma schema...
docker-compose exec -T backend npx prisma db pull

echo Generating Prisma client...
docker-compose exec -T backend npx prisma generate

echo Restarting backend to apply changes...
docker-compose restart backend

echo %GREEN%✅ All services ready!%NC%
echo ----------------------------------------------------------
echo Backend:  http://localhost:3001
echo Frontend: http://!IP_ADDR!:8081
echo ----------------------------------------------------------
echo Tailing logs...
docker-compose logs -f