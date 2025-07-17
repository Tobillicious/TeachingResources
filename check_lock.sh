#!/bin/bash

# This script checks if a file is locked
# Usage: ./check_lock.sh <file_path>

FILE_PATH=$1
LOCK_FILE="file_locks.json"

# Check if file_locks.json exists
if [ ! -f $LOCK_FILE ]; then
  echo "File '$FILE_PATH' is not locked."
  exit 0
fi

# Check if jq is installed
if ! command -v jq &> /dev/null
then
    echo "jq could not be found. Please install jq to use this script."
    exit 1
fi

# Check if the file is locked
if jq -e --arg path "$FILE_PATH" '.[$path]' $LOCK_FILE > /dev/null; then
  LOCKED_BY=$(jq --arg path "$FILE_PATH" '.[$path].agent' $LOCK_FILE)
  echo "File '$FILE_PATH' is locked by $LOCKED_BY."
  exit 1
else
  echo "File '$FILE_PATH' is not locked."
  exit 0
fi
