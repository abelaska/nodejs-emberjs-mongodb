#!/bin/sh
#
for file in `find ../.. -name "*.js" | grep -v "client/lib" | grep -v "node_modules" | grep -v "client.build"`; do
    echo ===Linting $file...===
    jshint $file;
done
echo
