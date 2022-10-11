#! bin/bash
docker stop $1
docker pull enthusiast/sudoku-server:latest
docker-compose -f ./docker-compose-live.yaml up
