#!/bin/sh
# icefinder.sh version 2.0b
# usage: sh icefinder.sh password mypath

PASSWORD="$1"
TILEPATH="$2"

DATE_NASA=$(date +"%Y%j") # use this if you want todays files
DATE_DATABASE=$(date +"%Y-%m-%d")

# DATE_NASA="2013301"  # use this line if you want a specific date
# DATE_DATABASE="2013-10-29" # and this

### Downloading two JPG files from Earthdata.nasa.gov (extracted from https://earthdata.nasa.gov/labs/worldview/ )

wget -O ~/git/icefinder/1-2-1.jpg "http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=$DATE_NASA&extent=4.0,55.0,31.0,70.0&epsg=4326&layers=MODIS_Terra_SurfaceReflectance_Bands121&format=image/jpeg&width=12288&height=6827"

wget -O ~/git/icefinder/3-6-7.jpg "http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=$DATE_NASA&extent=4.0,55.0,31.0,70.0&epsg=4326&layers=MODIS_Terra_CorrectedReflectance_Bands367&format=image/jpeg&width=12288&height=6827"

# Reproject the downloaded files to web mercator and TIF (don't needed???)

# gdalwarp -s_srs "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs" -t_srs "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +units=m +no_defs " -r bilinear 1-2-1.jpg 1-2-1_3857.tif
# gdalwarp -s_srs "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs" -t_srs "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +units=m +no_defs " -r bilinear 3-6-7.jpg 3-6-7_3857.tif


### Create a big JPG with the two layers using make_satellite.py with the imagery.xml script

### echo "generating combined image..."
### python make_satellite.py   # I have included make_satellite.py to speed up the actual tile generation (below)

### Create a TIF which has the content tiled.

echo "converting to tiled TIF" 

gdal_translate ~/git/icefinder/1-2-1.jpg ~/git/icefinder/1-2-1.tif -co "TILED=YES"
gdal_translate ~/git/icefinder/3-6-7.jpg ~/git/icefinder/3-6-7.tif -co "TILED=YES"

### gdal_translate combined.jpg combined.tif -co "TILED=YES" # This is also for speeding up tile making

### generate tiles from the combine.tif.
### Going back to Mapnik since gdal2tiles makes ugly tiles (no nice resampling)

MAPNIK_MAP_FILE="~/git/icefinder/image_cloud.xml" MAPNIK_TILE_DIR="~/git/icefinder/$TILEPATH/$DATE_NASA" MAPNIK_MINZOOM="5" MAPNIK_MAXZOOM="11" python generate_tiles_imagery.py

# python gdal2tiles_jpg.py --tile-format="jpeg" -r bilinear -z 5-11 -s "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +units=m +no_defs" combined.jpg $TILEPATH/$DATE_NASA


### Adding the date to icefinder.se

echo "Adding to database..."

wget -q -O result.html "http://www.icefinder.se/2.0b/add.php?date=$DATE_DATABASE&password=$PASSWORD"

### Renaming combine file (as backup)

## mv combined.jpg combined.$DATE_NASA.jpg

### Removing all used files

rm ~/git/icefinder/1-2-1.jpg
rm ~/git/icefinder/3-6-7.jpg
rm result.html
rm $DATE_NASA/googlemaps.html
rm $DATE_NASA/openlayers.html
rm $DATE_NASA/tilemapresource.xml
rm combined.tif

### Posting to Twitter!

python tweet.py "Imagery for $DATE_DATABASE (today) are now online on Ice Finder! http://www.icefinder.se"

echo "Done!"

