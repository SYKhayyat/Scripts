#!/bin/bash

echo "Cloning Otzaria library repository..."

if [ -d "library" ]; then
    echo "Library folder already exists!"
    read -p "Overwrite? (y/n) " -n 1 -r
    echo
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
    rm -rf library
fi

echo "Cloning the library (this may take a while)..."
git clone --depth 1 https://github.com/zevisvei/otzaria-library.git temp_library

if [ $? -eq 0 ]; then
    echo "Copying books to library folder..."
    mkdir -p library
    
    if [ -d "temp_library/אוצריא" ]; then
        cp -r temp_library/אוצריא/* library/
    elif [ -d "temp_library/books" ]; then
        cp -r temp_library/books/* library/
    else
        cp -r temp_library/* library/
    fi
    
    rm -rf temp_library
    
    echo ""
    echo "========================================"
    echo "Library cloned successfully!"
    echo "Library saved to: ./library/"
    echo ""
    echo "Now run: npm run dev"
    echo "========================================"
else
    echo "Failed to clone library!"
    echo "Please try manually:"
    echo "git clone --depth 1 https://github.com/zevisvei/otzaria-library.git temp_library"
fi
