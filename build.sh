#!/bin/bash
set -e

echo "Installing backend dependencies..."
cd backend
npm install

echo "Building frontend..."
cd ../frontend
npm install
npm run build

echo "Moving frontend build to backend public folder..."
cp -r dist ../backend/public

echo "Deployment complete!"
