#!/usr/bin/env bash

echo "Deleting android and ios directories..."
rm -rf android ios

echo "Performing prebuild..."
npx expo prebuild
