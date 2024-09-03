#!/bin/bash

while true; do
  curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"isFlood":true,"timeLimit":10,"ipAddress":"200.129.73.211"}' \
    http://localhost:8080/ping-reports
  
  let "created_ping_reports+=1"

  echo -e "\nCreated ping reports: $created_ping_reports\n"
done
