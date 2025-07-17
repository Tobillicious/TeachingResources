#!/bin/bash

# This script locks a file for editing
# Usage: ./lock_file.sh <file_path>

FILE_PATH=$1
LOCK_FILE="file_locks.json"
AGENT_NAME=${AGENT_NAME:-"DeveloperAgent"} # Default to DeveloperAgent if not set

# Check if file_locks.json exists, create it if not
if [ ! -f $LOCK_FILE ]; then
  echo "{}" > $LOCK_FILE
fi

# Check if jq is installed
if ! command -v jq &> /dev/null
then
    echo "jq could not be found. Please install jq to use this script."
    exit 1
fi

# Check if the file is already locked
if jq -e --arg path "$FILE_PATH" '.[$path]' $LOCK_FILE > /dev/null; then
  LOCKED_BY=$(jq --arg path "$FILE_PATH" '.[$path].agent' $LOCK_FILE)
  echo "Error: File '$FILE_PATH' is already locked by $LOCKED_BY."
  exit 1
fi

# Lock the file
jq --arg path "$FILE_PATH" --arg agent "$AGENT_NAME" \
   '. + {($path): {"agent": $agent, "timestamp": (now | todate)}}' \
   $LOCK_FILE > file_locks.tmp.json && mv file_locks.tmp.json $LOCK_FILE

echo "File '$FILE_PATH' locked successfully."
