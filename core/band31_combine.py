#!/usr/bin/env python
import mapnik
map = mapnik.Map(12288, 6827)
mapnik.load_map(map, 'band31_combine.xml')
map.zoom_all() 
mapnik.render_to_file(map, 'image_combined.png')