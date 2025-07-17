#!/bin/bash

# This script checks the status of the latest GitHub Pages deployment.

# Usage: ./check-pages-status.sh

# Get the owner and repo from the git remote URL
REMOTE_URL=$(git config --get remote.origin.url)
OWNER=$(echo "$REMOTE_URL" | sed -n 's/.*github.com:\([^/]*\)\/.* /\1/p')
REPO=$(echo "$REMOTE_URL" | sed -n 's/.*\/_git\/\(.*\)/\1/p')

if [ -z "$OWNER" ] || [ -z "$REPO" ]; then
  echo "Could not determine owner and repo from git remote URL."
  exit 1
fi

# Get the latest deployment
LATEST_DEPLOYMENT=$(curl -s -H "Accept: application/vnd.github.v3+json" \
  "https://api.github.com/repos/$OWNER/$REPO/deployments?environment=github-pages&per_page=1")

# Get the status of the latest deployment
LATEST_STATUS_URL=$(echo "$LATEST_DEPLOYMENT" | jq -r '.[0].statuses_url')
LATEST_STATUS=$(curl -s -H "Accept: application/vnd.github.v3+json" "$LATEST_STATUS_URL")

# Print the status
echo "$LATEST_STATUS" | jq .