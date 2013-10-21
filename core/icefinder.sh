#!/bin/sh
# icefinder.sh version 2.0b
# usage: sh icefinder.sh 

# SATELLITE="$1"
# FILE_TODAY="$1"
# CAT_NAME="$3"

FILE_TODAY=$(date +"%Y%j")

# FILE_TODAY="2013293"


### Downloading JPG from NASA.

wget -O 1-2-1.jpg "http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=$FILE_TODAY&extent=4.0,55.0,31.0,70.0&epsg=4326&layers=MODIS_Terra_SurfaceReflectance_Bands121&format=image/jpeg&width=12288&height=6827"

wget -O 3-6-7.jpg "http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=$FILE_TODAY&extent=4.0,55.0,31.0,70.0&epsg=4326&layers=MODIS_Terra_CorrectedReflectance_Bands367&format=image/jpeg&width=12288&height=6827"

gdalwarp -s_srs "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs" -t_srs "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +units=m +no_defs " -r bilinear 1-2-1.jpg 1-2-1_3857.tif

gdalwarp -s_srs "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs" -t_srs "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +units=m +no_defs " -r bilinear 3-6-7.jpg 3-6-7_3857.tif

# create big image

python make_satellite.py

# generate tiles

MAPNIK_MAP_FILE="image.xml"  MAPNIK_TILE_DIR="tiles$FILE_TODAY"  python generate_tiles_imagery.py

# moving and renaming the catalog to right name

# mv /Users/oskarlin/Sites/modisstor "/Users/oskarlin/Sites/icefinder/$SATELLITE.$FILE_TODAY"

# upload to FTP

# ncftpput -r 10 -R -v -z -F -u "skridskokartan.se" -p "zdf092T" ftp.skridskokartan.se /icefinder "$SATELLITE.$FILE_TODAY"
# ncftpput -r 10 -R -v -z -F -u "skridskokartan.se" -p "zdf092T" ftp.skridskokartan.se /icefinder "$SATELLITE.$FILE_TODAY"
# ncftpput -r 10 -R -v -z -F -u "skridskokartan.se" -p "zdf092T" ftp.skridskokartan.se /icefinder "$SATELLITE.$FILE_TODAY"
# ncftpput -r 10 -R -v -z -F -u "skridskokartan.se" -p "zdf092T" ftp.skridskokartan.se /icefinder "$SATELLITE.$FILE_TODAY"
# ncftpput -r 10 -R -v -z -F -u "skridskokartan.se" -p "zdf092T" ftp.skridskokartan.se /icefinder "$SATELLITE.$FILE_TODAY"

# rm 3-6-7_3857.tif
# rm 1-2-1_3857.tif
