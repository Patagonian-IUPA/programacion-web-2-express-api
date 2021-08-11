#!/usr/bin/env bash

set -ex

npm run server:stop
git pull
npm run server

echo Terminado
