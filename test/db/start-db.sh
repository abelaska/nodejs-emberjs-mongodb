#!/bin/sh
#
[ ! -d data ] && mkdir data
mongodb-linux-*/bin/mongod --dbpath data --rest
