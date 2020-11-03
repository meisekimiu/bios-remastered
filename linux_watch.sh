#!/bin/bash
while :
do
    clear
    npm run test -- "$@"
    inotifywait -q -r -e close_write -e create . > /dev/null 2>&1
done
