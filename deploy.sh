#!/bin/bash
sudo su
git pull origin main
docker-compose up -d --build
