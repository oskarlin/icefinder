#!/bin/sh
# icefinder.sh version 2.0b
# usage: sh icefinder.sh password date

DATE="$1"

if [ $DATE ]
	then 
		DATE_DATABASE=$DATE
		echo "Database!"
	else
		DATE_DATABASE=$(date +"%Y-%m-%d")
fi

echo $DATE_DATABASE
