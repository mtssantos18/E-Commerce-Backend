#!/usr/bin/env bash
# exit on error
set -o errexit

yarn
npm run build
yarn typeorm migration:run -d dist/data-source