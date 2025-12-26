#!/bin/bash

# Function to detect local IP address
get_local_ip() {
    if [[ "$OSTYPE" == "darwin"* ]]; then
        # macOS
        ipconfig getifaddr en0 || ipconfig getifaddr en1
    else
        # Linux
        hostname -I | awk '{print $1}'
    fi
}

echo "--- Bearfit Development Launcher ---"
echo "Select connection mode:"
echo "1) LAN (Best for physical devices on same WiFi)"
echo "2) Tunnel (Best for remote work / different LANs)"
echo "3) Localhost (Best for Simulators on this machine)"

read -p "Enter choice [1-3]: " choice

case $choice in
    1)
        IP=$(get_local_ip)
        if [ -z "$IP" ]; then
            echo "Could not detect local IP. Falling back to localhost."
            export REACT_NATIVE_PACKAGER_HOSTNAME=localhost
            export EXPO_START_ARGS=""
        else
            echo "Detected LAN IP: $IP"
            export REACT_NATIVE_PACKAGER_HOSTNAME=$IP
            export EXPO_START_ARGS="--lan"
        fi
        ;;
    2)
        echo "Using Tunnel mode (requires Expo account)..."
        export REACT_NATIVE_PACKAGER_HOSTNAME=localhost
        export EXPO_START_ARGS="--tunnel"
        ;;
    3)
        echo "Using Localhost mode..."
        export REACT_NATIVE_PACKAGER_HOSTNAME=localhost
        export EXPO_START_ARGS=""
        ;;
    *)
        echo "Invalid choice. Defaulting to Localhost."
        export REACT_NATIVE_PACKAGER_HOSTNAME=localhost
        export EXPO_START_ARGS=""
        ;;
esac

echo "Starting Docker containers..."
docker-compose up --build
