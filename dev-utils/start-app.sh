#!/bin/sh

HOST=10.11.12.19
PORT=4201
NG_PATH=./node_modules/@angular/cli/bin/
LOG_DIR=./logs

forever start --uid "serve" -o $LOG_DIR/serve-output.log -e $LOG_DIR/serve-error.log -a $NG_PATH/ng serve --host $HOST --port $PORT --no-live-reload

