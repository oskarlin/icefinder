#!/bin/sh
# band31finder.sh version 1.0b1
# usage: sh band31finder.sh password mypath

PASSWORD="$1"
TILEPATH="$2"

# download the image

# wget -O $DLPATH/image.jpg http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=2014332&extent=4.0,55.0,31.0,70.0&epsg=4326&layers=MODIS_Terra_Land_Surface_Temp_Day&format=image/jpeg&width=12288&height=6827

wget -O image.tif "http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=2014332&extent=4.0,55.0,31.0,70.0&epsg=4326&layers=MODIS_Terra_Land_Surface_Temp_Day&format=image/tiff&width=12288&height=6827"


gdal_translate -b 1 image.tif image_red.tif
gdal_translate -b 2 image.tif image_green.tif

gdaldem color-relief image_red.tif -alpha red_colortable.txt image_red_rgb.tif
gdaldem color-relief image_green.tif -alpha green_colortable.txt image_green_rgb.tif

python band31_combine.py



## gdal_translate /root/git/icefinder/core/1-2-1.jpg /root/git/icefinder/core/1-2-1.tif -co "TILED=YES"
## gdal_translate /root/git/icefinder/core/3-6-7.jpg /root/git/icefinder/core/3-6-7.tif -co "TILED=YES"
