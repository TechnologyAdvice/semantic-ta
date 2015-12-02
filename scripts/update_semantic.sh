#!/usr/bin/env bash

##############################################################################
# Update Semantic UI
#
#   This script will npm install the latest Semantic UI LESS and copy all the
#   necessary files into our build.

# exit immediately if any step fails
set -e

# get latest semantic
echo "... updating Semantic UI NPM module"
npm i semantic-ui-less@latest -D

# themes
echo "... copying themes"
rm -rf src/themes/*
cp -R node_modules/semantic-ui-less/themes/* src/themes/

# definitions
echo "... copying definitions"
rm -rf src/definitions/*
cp -R node_modules/semantic-ui-less/definitions/* src/definitions

# src/ root files
echo "... copying root files"
cp node_modules/semantic-ui-less/semantic.less src
cp node_modules/semantic-ui-less/theme.less src
cp node_modules/semantic-ui-less/theme.config.example src
mv src/theme.config.example src/theme.config

echo "... Done!"
