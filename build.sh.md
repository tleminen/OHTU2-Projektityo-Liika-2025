#!/bin/sh

# Lopeta, jos tapahtuu virhe
set -e

echo "Starting build process..."

# Siirry Web Appin pääkansioon
cd /home/site/wwwroot

# 1️⃣ Asenna frontendin riippuvuudet ja rakenna
if [ -d "frontend" ]; then
  echo "Installing frontend dependencies..."
  cd frontend
  npm install
  npm run build
  cd ../
else
  echo "❌ Frontend directory not found!"
fi

# 2️⃣ Asenna backendin riippuvuudet ja kopioi frontendin buildi backendille
if [ -d "backend" ]; then
  echo "Installing backend dependencies..."
  cd backend
  npm install
  mkdir -p public
  cp -r ../frontend/dist/* public/
  cd ../
else
  echo "❌ Backend directory not found!"
fi

echo "✅ Build process completed."
