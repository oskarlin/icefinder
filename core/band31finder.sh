#!/bin/sh
# band31finder.sh version 1.0b1
# usage: sh band31finder.sh password mypath

PASSWORD="$1"
TILEPATH="$2"

DATE_NASA=$(date +"%Y%j")

# download the image

echo "laddar ner image..."
echo $DATE_NASA

wget -O image.tif "http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=$DATE_NASA&extent=4.0,55.0,31.0,70.0&epsg=4326&layers=MODIS_Terra_Land_Surface_Temp_Day&format=image/tiff&width=12288&height=6827"

gdal_translate -b 1 image.tif image_red.tif
gdal_translate -b 2 image.tif image_green.tif

gdaldem color-relief image_red.tif -alpha red_colortable.txt image_red_rgb.tif
gdaldem color-relief image_green.tif -alpha green_colortable.txt image_green_rgb.tif

python band31_combine.py

gdal_translate image_combined.png $DATE_NASA.combined.tif

# MAPNIK_MAP_FILE="band31.xml" MAPNIK_TILE_DIR="$DATE_NASA" MAPNIK_MINZOOM="5" MAPNIK_MAXZOOM="9" python generate_tiles_band31.py

## gdal_translate /root/git/icefinder/core/1-2-1.jpg /root/git/icefinder/core/1-2-1.tif -co "TILED=YES"
## gdal_translate /root/git/icefinder/core/3-6-7.jpg /root/git/icefinder/core/3-6-7.tif -co "TILED=YES"
