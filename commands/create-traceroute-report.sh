#!/bin/bash

while true; do
  curl --header "Content-Type: application/json" \
    --request POST \
    --data '{"ipAddress":"200.129.73.211"}' \
    http://localhost:8080/traceroute-reports
  
  let "created_traceroute_reports+=1"

  echo -e "\nCreated traceroute reports: $created_traceroute_reports\n"
done
