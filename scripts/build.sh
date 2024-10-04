#!/bin/bash
cp .env options/.env

echo "Building main Vite project..."
pnpm run build-main

echo "Building options Vite project..."
cd options
pnpm run build
cd ..

cp options/dist/index.html dist/contents.html
cp -r options/dist/assets/* dist/assets/

rsync -av --exclude='assets' --exclude='index.html' options/dist/ dist/

rm -rf ./options/dist

rm options/.env