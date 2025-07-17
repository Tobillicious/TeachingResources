#!/bin/bash

# This script updates a task in tasks.json
# Usage: ./update_task.sh <task_id> <status> [comment]

TASK_ID=$1
STATUS=$2
COMMENT=$3

# Check if tasks.json exists
if [ ! -f tasks.json ]; then
  echo "Error: tasks.json not found."
  exit 1
fi

# Check if jq is installed
if ! command -v jq &> /dev/null
then
    echo "jq could not be found. Please install jq to use this script."
    exit 1
fi

# Update the task status and add a log entry
jq --argjson id "$TASK_ID" --arg status "$STATUS" --arg comment "$COMMENT" \
   '(.tasks[] | select(.id == $id)).status = $status | (.tasks[] | select(.id == $id)).log += [{"timestamp": (now | todate), "agent": "DeveloperAgent", "comment": $comment}]' \
   tasks.json > tasks.tmp.json && mv tasks.tmp.json tasks.json

echo "Task $TASK_ID updated successfully."

