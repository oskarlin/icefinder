#!/bin/sh
# band31finder.sh version 1.0b1
# usage: sh band31finder.sh password mypath date satellite Day/Night

PASSWORD="$1"
TILEPATH="$2"
# DATE_NASA="$3"
SATELLITE="$4"
DAYTIME="$5"


if test "$3" = "today"
then
	DATE_NASA=$(date +"%Y%j")
elif test "$3" = "yesterday"
then
	DATE_NASA=$(date -j -v-1d +"%Y%j")
else
	DATE_NASA="$3"
fi

#DATE_NASA=$(date +"%Y%j")

# download the image

URL_1="http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=$DATE_NASA&extent=4.0,55.0,31.0,70.0&epsg=4326&layers=MODIS_"
URL_2="_Land_Surface_Temp_"
URL_3="&format=image/tiff&width=12288&height=6827"

URL=$URL_1$SATELLITE$URL_2$DAYTIME$URL_3

# http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=2014351&extent=15.41650390625,65.781005859375,16.29541015625,66.659912109375&epsg=4326&layers=MODIS_Terra_CorrectedReflectance_TrueColor,Coastlines,MODIS_Terra_Land_Surface_Temp_Night&opacities=1,1,1&worldfile=false&format=image/jpeg&width=400&height=400

echo $MODIS
echo "laddar ner image..."
echo $DATE_NASA

wget -O image.tif "$URL"

gdal_translate -b 1 image.tif image_red.tif
gdal_translate -b 2 image.tif image_green.tif

gdaldem color-relief image_red.tif -alpha red_colortable.txt image_red_rgb.tif
gdaldem color-relief image_green.tif -alpha green_colortable.txt image_green_rgb.tif

python band31_combine.py

gdal_translate image_combined.png $DATE_NASA.$SATELLITE.$DAYTIME.combined.tif

# MAPNIK_MAP_FILE="band31.xml" MAPNIK_TILE_DIR="$DATE_NASA" MAPNIK_MINZOOM="5" MAPNIK_MAXZOOM="9" python generate_tiles_band31.py

## gdal_translate /root/git/icefinder/core/1-2-1.jpg /root/git/icefinder/core/1-2-1.tif -co "TILED=YES"
## gdal_translate /root/git/icefinder/core/3-6-7.jpg /root/git/icefinder/core/3-6-7.tif -co "TILED=YES"
