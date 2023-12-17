#!/bin/bash

# 起動する Docker Compose プロジェクトを指定
compose_files=("backend/docker-compose.yml" "./docker-compose.yml")

# Docker Compose プロジェクトを起動
start_projects() {
  for file in "${compose_files[@]}"; do
    docker-compose -f "$file" up -d
  done
}

# Docker Compose プロジェクトを停止
stop_projects() {
  for file in "${compose_files[@]}"; do
    docker-compose -f "$file" down
  done
}

# スクリプト引数により起動または停止の処理を実行
if [[ "$1" == "start" ]]; then
  start_projects
elif [[ "$1" == "stop" ]]; then
  stop_projects
else
  echo "Usage: ./manage-projects.sh [start|stop]"
fi
