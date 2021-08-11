#!/usr/bin/env bash

set -ex

source ~/.bashrc

npm run server:stop
git pull
npm run server

echo Terminado
