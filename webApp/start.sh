#!/usr/bin/env bash

echo ======
echo Check the required file
echo

if [ ! -f "demo/Flatmax_-_Central_transmission.ogg" ]
then
    echo "file does not exist"
    wget -P demo "https://ogg.jamendo.com/download/track/206411/ogg1/Flatmax_-_Central_transmission.ogg"
fi

polymer serve -P https/1.1 --hostname 0.0.0.0
