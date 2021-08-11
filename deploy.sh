#!/usr/bin/env bash

set -ex

. ~/.nvm/nvm.sh

npm run server:stop
git pull
npm run server

echo Terminado
