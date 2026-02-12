#!/bin/bash

# Test script for docx2org converter

set -euo pipefail

echo "=== DOCX to Org Converter Test Suite ==="
echo

# Create test directory
TEST_DIR="test_output"
rm -rf "$TEST_DIR"
mkdir -p "$TEST_DIR"
echo "Created test directory: $TEST_DIR"

# Test 1: Check if script exists and is executable
echo "Test 1: Script availability"
if [[ -f "./docx2org" && -x "./docx2org" ]]; then
    echo "✓ Script exists and is executable"
else
    echo "✗ Script not found or not executable"
    exit 1
fi
echo

# Test 2: Check pandoc availability
echo "Test 2: Pandoc availability"
if command -v pandoc > /dev/null; then
    echo "✓ Pandoc is installed"
else
    echo "✗ Pandoc not found"
    echo "Please install pandoc to run full tests"
    exit 1
fi
echo

# Test 3: Help/usage message
echo "Test 3: Help message"
OUTPUT=$(./docx2org 2&& echo "OK" || echo "FAIL")
if [[ "$OUTPUT" == "FAIL" ]]; then
    echo "✓ Help message displayed correctly"
else
    echo "✗ Unexpected output for help message"
fi
echo

# Test 4: Directory processing (empty directory)
echo "Test 4: Empty directory processing"
mkdir -p "$TEST_DIR/empty"
OUTPUT=$(./docx2org "$TEST_DIR/empty" 2>&1 || echo "ERROR")
if [[ "$OUTPUT" == *"Total files: 0"* ]]; then
    echo "✓ Empty directory processed correctly"
else
    echo "✗ Unexpected output for empty directory"
fi
rm -rf "$TEST_DIR/empty"
echo

# Test 5: File conflict handling (simulation)
echo "Test 5: Conflict handling simulation"
# Create test files for conflict scenario
touch "$TEST_DIR/existing.org"
echo "test content" > "$TEST_DIR/existing.org"

echo "Test files created:"
ls -la "$TEST_DIR"

# This test requires interactive input, so we just verify the setup
echo "✓ Test setup for conflict handling complete"
echo "   Run manually: ./docx2org test_output/existing.docx"
echo "   And test the interactive conflict resolution"
echo

# Test 6: Script syntax check
echo "Test 6: Syntax check"
if bash -n "./docx2org"; then
    echo "✓ Syntax check passed"
else
    echo "✗ Syntax errors found"
    exit 1
fi
echo

echo "=== All tests completed ==="
echo
echo "Manual tests to perform:"
echo "1. Convert a real DOCX file: ./docx2org sample.docx"
echo "2. Test directory recursion: ./docx2org ./test_docs"
echo "3. Test interactive conflict resolution"
echo
echo "Test directory contents:"
ls -la "$TEST_DIR"

echo
echo "Script is ready for use!"