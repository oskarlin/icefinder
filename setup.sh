#!/usr/bin/env bash

if [[ "$OSTYPE" =~ ^[Ll]inux  && -f /etc/debian_version ]];then
  sudo apt-get install build-essential git libgdal-dev gdal-bin libmapnik-dev
  sudo pip list | grep mapnik2 || sudo pip install mapnik2
fi
