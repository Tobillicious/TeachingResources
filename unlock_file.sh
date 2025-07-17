#!/bin/bash

# This script unlocks a file
# Usage: ./unlock_file.sh <file_path>

FILE_PATH=$1
LOCK_FILE="file_locks.json"

# Check if file_locks.json exists
if [ ! -f $LOCK_FILE ]; then
  echo "Error: $LOCK_FILE not found."
  exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null
then
    echo "jq could not be found. Please install jq to use this script."
    exit 1
fi

# Unlock the file
jq --arg path "$FILE_PATH" 'del(.[$path])' $LOCK_FILE > file_locks.tmp.json && mv file_locks.tmp.json $LOCK_FILE

echo "File '$FILE_PATH' unlocked successfully."
