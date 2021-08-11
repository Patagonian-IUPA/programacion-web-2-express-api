#!/usr/bin/env bash

set -ex

cd "$(dirname "$0")"

npm run server:stop
git pull
npm run server

echo Terminado
