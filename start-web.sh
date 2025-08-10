#!/bin/bash

echo "Starting Tanakit's Midterm Project..."

# เพิ่ม node_modules/.bin ใน PATH
export PATH=$PATH:$(pwd)/node_modules/.bin

# ตรวจสอบว่ามี expo หรือไม่
if command -v expo &> /dev/null; then
    echo "Using installed Expo CLI"
    expo start --web --port 30019
elif [ -f "./node_modules/.bin/expo" ]; then
    echo "Using local Expo CLI from node_modules"
    ./node_modules/.bin/expo start --web --port 30019
elif command -v npx &> /dev/null; then
    echo "Using npx to run Expo CLI"
    npx expo start --web --port 30019
else
    echo "Error: Expo CLI not found"
    echo "Please run: npm install -g @expo/cli"
    exit 1
fi
