#!/bin/sh

LOG_DIR=./logs

forever start --uid "nodeWatch" -o $LOG_DIR/watch-output.log -e $LOG_DIR/watch-error.log -a -c node nodeJsWatch.js

