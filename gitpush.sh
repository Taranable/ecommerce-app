#!/bin/bash

# Check if the current branch is main
current_branch=$(git rev-parse --abbrev-ref HEAD)
if [ "$current_branch" != "main" ]; then
    echo "Error: You must be on the main branch to execute this script."
    exit 1
fi

# Add all changes
git add .

# Commit changes with the provided message or a default message if none is provided
if [ $# -eq 0 ]; then
    default_message="Automatic commit on $(date +'%Y-%m-%d %H:%M:%S')"
    git commit -m "$default_message"
else
    git commit -m "$1"
fi

# Push changes to main branch
git push origin main



