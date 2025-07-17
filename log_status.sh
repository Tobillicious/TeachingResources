#!/bin/bash

# This script adds a log entry to AGENT_COMMUNICATION.md
# Usage: ./log_status.sh "<message>"

MESSAGE=$1
LOG_FILE="AGENT_COMMUNICATION.md"
AGENT_NAME=${AGENT_NAME:-"DeveloperAgent"} # Default to DeveloperAgent if not set

# Prepend the message to the log file
echo "
*   **Agent:** $AGENT_NAME
*   **Timestamp:** $(date -u +"%Y-%m-%dT%H:%M:%SZ")
*   **Message:** $MESSAGE
" >> $LOG_FILE

echo "Status logged successfully."
