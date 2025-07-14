#!/bin/bash

echo "🔍 Checking GitHub Pages Status for TeachingResources..."
echo "=================================================="

# Check repository exists
echo "📋 Repository Status:"
curl -s https://api.github.com/repos/Tobillicious/TeachingResources | grep -E '"name"|"private"|"default_branch"' | sed 's/  //g'

echo ""
echo "🌐 GitHub Pages Status:"
# Check if GitHub Pages is enabled
PAGES_STATUS=$(curl -s https://api.github.com/repos/Tobillicious/TeachingResources/pages 2>/dev/null)

if [ $? -eq 0 ] && [ ! -z "$PAGES_STATUS" ]; then
    echo "✅ GitHub Pages is ENABLED"
    echo "$PAGES_STATUS" | grep -E '"url"|"status"|"source"' | sed 's/  //g'
else
    echo "❌ GitHub Pages is NOT ENABLED"
    echo ""
    echo "📝 To enable GitHub Pages:"
    echo "1. Go to: https://github.com/Tobillicious/TeachingResources/settings/pages"
    echo "2. Select 'Deploy from a branch'"
    echo "3. Choose 'main' branch and '/' folder"
    echo "4. Click 'Save'"
fi

echo ""
echo "🔗 Website URL:"
echo "https://tobillicious.github.io/TeachingResources/"

echo ""
echo "📁 Current Repository Files:"
ls -la *.html | head -5
echo "... and more files"

echo ""
echo "✅ Ready to deploy! Follow the instructions above to enable GitHub Pages." 