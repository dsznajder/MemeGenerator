#!/bin/sh

_=$(command -v yarn);
if [ "$?" != "0" ]; then
  npm install;
fi;
yarn install;

if [[ "$OSTYPE" == "darwin"* ]]; then
  echo "Installing pods...\n"
  cd ios && pod install && cd ..;
fi

