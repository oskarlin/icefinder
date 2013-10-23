#!/bin/sh
# icefinder.sh version 2.0b
# usage: sh icefinder.sh password

PASSWORD="$1"

# DATE_NASA=$(date +"%Y%j") # use this if you want todays files
# DATE_DATABASE=$(date +"%Y-%m-%d")

DATE_NASA="2013293"  # use this line if you want a specific date
DATE_DATABASE="2013-10-20" # and this

### Downloading two JPG files from Earthdata.nasa.gov (extracted from https://earthdata.nasa.gov/labs/worldview/ )

wget -O 1-2-1.jpg "http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=$DATE_NASA&extent=4.0,55.0,31.0,70.0&epsg=4326&layers=MODIS_Terra_SurfaceReflectance_Bands121&format=image/jpeg&width=12288&height=6827"

wget -O 3-6-7.jpg "http://map2.vis.earthdata.nasa.gov/imagegen/index.php?TIME=$DATE_NASA&extent=4.0,55.0,31.0,70.0&epsg=4326&layers=MODIS_Terra_CorrectedReflectance_Bands367&format=image/jpeg&width=12288&height=6827"

# Reproject the downloaded files to web mercator and TIF (don't needed???)

# gdalwarp -s_srs "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs" -t_srs "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +units=m +no_defs " -r bilinear 1-2-1.jpg 1-2-1_3857.tif
# gdalwarp -s_srs "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs" -t_srs "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +units=m +no_defs " -r bilinear 3-6-7.jpg 3-6-7_3857.tif


### Create a big JPG with the two layers using make_satellite.py with the imagery.xml script

echo "generating combined image..."
python make_satellite.py

# I have included make_satellite.py to speed up the actual tile generation (below)

### generate tiles from the combine.jpg which is created with "python make_satellite.py". 

# MAPNIK_MAP_FILE="image.xml" MAPNIK_TILE_DIR="$DATE_NASA" MAPNIK_MINZOOM="5" MAPNIK_MAXZOOM="11" python generate_tiles_imagery.py

python gdal2tiles_jpg.py --tile-format="jpeg" -r bilinear -z 5-11 -s "+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +units=m +no_defs" combined.jpg $DATE_NASA

### moving catalog to right place


######
## Here we put the code for getting the catalog into the right place ##
######


### Adding the date to icefinder.se

echo "Adding to database..."

wget -q -O result.html "http://www.icefinder.se/2.0b/add.php?date=$DATE_DATABASE&password=$PASSWORD"

### Renaming combine file (as backup)

mv combined.jpg combined.$DATE_NASA.jpg

### Removing all used files

rm 1-2-1.jpg
rm 3-6-7.jpg
rm result.html
rm $DATE_NASA/googlemaps.html
rm $DATE_NASA/openlayers.html
rm $DATE_NASA/tilemapresource.xml

echo "Done!"

