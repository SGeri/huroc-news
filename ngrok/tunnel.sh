#!/bin/bash

### Get Tunnel URLS

RED='\033[0;31m'
ENDCOLOR="\e[0m"

# Make the curl request and store the response
response=$(curl --silent http://localhost:4040/api/tunnels)

# Extract the public URLs and ports using grep, awk, and sed
public_urls=($(echo "$response" | grep -oP '(?<="public_url":")[^"]*'))
addresses=($(echo "$response" | grep -oP '(?<="addr":")[^"]*' | awk -F':' '{print $3}'))

# Iterate over the extracted values and print the URL with the corresponding port
for ((i=0; i<${#public_urls[@]}; i++)); do
    url=${public_urls[i]}
    address=${addresses[i]}
    port=$(echo "$address" | sed -E 's/.*:(.*)/\1/')

    echo "Tunnel Public URL: $url - Port: $port"

    # if port is 3000 then set the environment variable SERVER_URL
    # if port is 19000 then set the environment variable EXPO_URL
    if [ "$port" = "3000" ]; then
        echo -e "${RED} > Using Ngrok Tunnel Proxy: Server ${ENDCOLOR}"
        echo -e "${RED} > Server URL: ${url} ${ENDCOLOR}"
        export SERVER_URL=$url

    elif [ "$port" = "19000" ]; then
        echo -e "${RED} > Using Ngrok Tunnel Proxy: Expo ${ENDCOLOR}"
        echo -e "${RED} > Expo URL: ${url} ${ENDCOLOR}"
        export EXPO_URL=$url
    fi
done