#!/usr/bin/env bash

export NVM_DIR="${NVM_DIR:-${HOME}/.nvm}"
[ -s "${NVM_DIR}/nvm.sh" ] && \. "${NVM_DIR}/nvm.sh"  # This loads nvm

set -ex

npm run server:stop
git pull
npm run server

echo Terminado
