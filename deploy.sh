#!/usr/bin/env bash

set -ex

cd "$(dirname "$0")"

npm run server:stop || true
git pull
npm install
npm run server

echo Terminado
