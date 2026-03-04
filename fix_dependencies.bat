@echo off
echo Closing Node.js processes...
taskkill /F /IM node.exe >nul 2>&1

echo Cleaning cache...
npm cache clean --force

echo Removing node_modules and lockfile...
rmdir /s /q node_modules
del /f /q package-lock.json

echo Installing dependencies...
call npm install
call npm install framer-motion lucide-react clsx tailwind-merge @radix-ui/react-slot

echo Done! You can now run 'npm run dev'.
pause
