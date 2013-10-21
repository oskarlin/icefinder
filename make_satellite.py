#!/usr/bin/env python
import mapnik
stylesheet = 'imagery.xml'
image = 'combined.jpg'
m = mapnik.Map(8853, 10919)
mapnik.load_map(m, stylesheet)
m.zoom_all() 
mapnik.render_to_file(m, image)
print "rendered image to '%s'" % image