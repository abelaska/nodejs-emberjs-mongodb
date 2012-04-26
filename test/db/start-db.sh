#!/bin/sh
#
[ ! -d data ] && mkdir data
mongodb-linux-x86_64-2.0.4/bin/mongod --dbpath data --rest
