#!/bin/sh
# icefinder.sh version 1.02
# usage: icefinder.sh [sattelite], for example "icefinder.sh terra"

# Satellite name requested in the command
SATELLITE="$1"

# FILE_TODAY="$2"
# CAT_NAME="$3"

FILE_TODAY=$(date +"%Y%j")
# FILE_TODAY="2013111"


FILE="BalticSea.$FILE_TODAY.$SATELLITE.721.250m.tif"
FILE="BalticSea.$FILE_TODAY.$SATELLITE.250m.tif"

LAYER_TODAY=$(date +"%Y%j")

DAGENS_DATUM=$(date +"%Y-%m-%d")

# Downloading the TIF from NASA. limit speed to 500k/s because it's stalling if higher rate is set, for some reason.

wget --read-timeout=10 --limit-rate=3000k -c -O BalticSea.$FILE_TODAY.$SATELLITE.721.250m.jpg http://lance-modis.eosdis.nasa.gov/imagery/subsets/?subset=BalticSea.$FILE_TODAY.$SATELLITE.721.250m.jpg
wget --read-timeout=10 --limit-rate=3000k -O BalticSea.$FILE_TODAY.$SATELLITE.367.250m.jpg http://lance-modis.eosdis.nasa.gov/imagery/subsets/?subset=BalticSea.$FILE_TODAY.$SATELLITE.367.250m.jpg
wget --read-timeout=10 --limit-rate=3000k -O BalticSea.$FILE_TODAY.$SATELLITE.250m.jpg http://lance-modis.eosdis.nasa.gov/imagery/subsets/?subset=BalticSea.$FILE_TODAY.$SATELLITE.250m.jpg

# Transforming from WGS84 to EPSG:3857 (google proj) and cropping it to my extents
# gdalwarp -t_srs EPSG:3857 -te 1000000 7400000 3000000 9400000 -ts 16384 16384 -r bilinear BalticSea.$FILE_TODAY.$SATELLITE.721.250m.tif BalticSea.$FILE_TODAY.$SATELLITE.721.250m.big.tif
# gdalwarp -t_srs EPSG:3857 -te 1000000 7400000 3000000 9400000 -ts 16384 16384 -r bilinear BalticSea.$FILE_TODAY.$SATELLITE.250m.tif BalticSea.$FILE_TODAY.$SATELLITE.250m.big.tif
# gdalwarp -t_srs EPSG:3857 -te 1000000 7400000 3000000 9400000 -ts 16384 16384 -r bilinear BalticSea.$FILE_TODAY.$SATELLITE.367.250m.tif BalticSea.$FILE_TODAY.$SATELLITE.367.250m.big.tif


# Creating a new XML with todays filename

MODIS_STRING="<?xml version=\"1.0\" encoding=\"utf-8\"?>
<Map srs=\"+proj=merc +lon_0=0 +k=1 +x_0=0 +y_0=0 +a=6378137 +b=6378137 +towgs84=0,0,0,0,0,0,0 +units=m +no_defs\">

  <Style name=\"blue\">
    <Rule>
      <RasterSymbolizer scaling=\"bilinear\" opacity=\"1\"/>
    </Rule>
  </Style>
  <Style name=\"true\">
    <Rule>
      <RasterSymbolizer scaling=\"bilinear\" comp-op=\"screen\" opacity=\"1\"/>
    </Rule>
  </Style>
  <Style name=\"red\">
    <Rule>
      <RasterSymbolizer scaling=\"bilinear\" comp-op=\"difference\" opacity=\"0.5\"/>
    </Rule>
  </Style>


  <Layer name=\"color\" srs=\"+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs\">
    <StyleName>blue</StyleName>
    <Datasource>
      <Parameter name=\"type\">gdal</Parameter>
      <Parameter name=\"file\">BalticSea.$FILE_TODAY.$SATELLITE.721.250m.jpg</Parameter>
    </Datasource>
  </Layer>  
  
   
  <Layer name=\"true\" srs=\"+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs\">
    <StyleName>true</StyleName>
    <Datasource>
      <Parameter name=\"type\">gdal</Parameter>
      <Parameter name=\"file\">BalticSea.$FILE_TODAY.$SATELLITE.250m.jpg</Parameter>
    </Datasource>
  </Layer>  


  <Layer name=\"red\" srs=\"+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs\">
    <StyleName>red</StyleName>
    <Datasource>
      <Parameter name=\"type\">gdal</Parameter>
      <Parameter name=\"file\">BalticSea.$FILE_TODAY.$SATELLITE.367.250m.jpg</Parameter>
    </Datasource>
  </Layer>  

</Map>"

echo "$MODIS_STRING" > /home/icefinder/tilecache-2.11/modis.xml

# running tilecache wich uses Mapnik to create map images that tilecache then cuts into tiles

mv *.jpg tilecache-2.11/

mkdir $FILE_TODAY

MAPNIK_MAP_FILE="/home/icefinder/tilecache-2.11/modis.xml" MAPNIK_TILE_DIR="$FILE_TODAY/" python generate_tiles.py

# python tilecache-2.11/tilecache_seed.py modisstor 0 7

# moving and renaming the catalog to right name

mv modisstor "$SATELLITE.$FILE_TODAY"

# upload to FTP

ncftpput -r 10 -R -v -z -F -u "icefindertiles" -p "NmyK1eXxMmcdJueQeTJn" tullingesk.se /icefinder "$SATELLITE.$FILE_TODAY"
ncftpput -r 10 -R -v -z -F -u "icefindertiles" -p "NmyK1eXxMmcdJueQeTJn" tullingesk.se /icefinder "$SATELLITE.$FILE_TODAY"
ncftpput -r 10 -R -v -z -F -u "icefindertiles" -p "NmyK1eXxMmcdJueQeTJn" tullingesk.se /icefinder "$SATELLITE.$FILE_TODAY"

rm tilecache-2.11/BalticSea.$FILE_TODAY.$SATELLITE.367.250m.big.tif
rm tilecache-2.11/BalticSea.$FILE_TODAY.$SATELLITE.250m.big.tif
rm tilecache-2.11/BalticSea.$FILE_TODAY.$SATELLITE.721.250m.big.tif

mv tilecache-2.11/*.tif gamla-tiff-filer/

wget http://skridskokartan.se/icefinder/add.php?date=$DAGENS_DATUM&satellite=0
