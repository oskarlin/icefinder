/*  map = new OpenLayers.Map ("map", {
      controls:[
          new OpenLayers.Control.Navigation(),
          new OpenLayers.Control.PanZoomBar(),

                    new OpenLayers.Control.Permalink('permalink'),
       //   new OpenLayers.Control.ScaleLine({geodesic: true}),
          new OpenLayers.Control.Attribution()
        //  new OpenLayers.Control.MousePosition({displayProjection: new OpenLayers.Projection("EPSG:3006")})
					],
      maxExtent: new OpenLayers.Bounds(1000000,7400000,2600000,9000000),
      maxResolution: 7812.5,
      units: 'm',
      projection: new OpenLayers.Projection("EPSG:3857"),
      displayProjection: new OpenLayers.Projection("EPSG:4326")
      //displayProjection: new OpenLayers.Projection("EPSG:3857")
  } );
*/

		
/* LEAFLET MAP 
	
	
	
			var tilelayer = L.tileLayer('test_gdal2tiles_patched2/{z}/{x}/{y}.jpg', {
			maxZoom: 9,
			minZoom: 9,
			attribution: 'oskarlin',
			tms: true
		});



	
*/
		
var map = L.map('map').setView([59.3186785549, 18.0534747746], 7);



/* sattelite-layers */

activesatellite = L.tileLayer(satellite_layers[0] + "/{z}/{x}/{y}.jpg", {   	
		maxZoom: 7,
		minZoom: 7,
		attribution: 'oskarlin',
		tms: true
	}).addTo(map);



/* var length = satellite_layers.length;

for (var i = 0; i < length; i++) {

//	alert(satellite_layers[i]);
	
	satellite_layers[i] = L.tileLayer(satellite_layers[i] + "/{z}/{x}/{y}.jpg", {   	
			maxZoom: 7,
			minZoom: 7,
			attribution: 'oskarlin',
			tms: true
  	}).addTo(map);
  	
  	
  

//	map.addLayer(satellite_layers[i]); // openlayers
		
} */


var baseMaps = {
	"Idag": activesatellite
/*		"Mapnik": mapnik,
		"gdal2tiles patched": gdal2tiles_patched,
		"gdal_tiler.py": gdal_tiler
				"Utan GDAL 24 bit": utan,
    "Med GDAL, PNG 8 bit": med,
    "Med GDAL, PNG 24 bit": med24,
    "Utan GDAL, från JPG, PNG24bit": utanjpg,
    "Utan GDAL, från JPG, JPG 60": jpg */
};
		

var colordem = L.tileLayer('tiles_colordem/{z}/{x}/{y}.png', {
	maxZoom: 11,
	minZoom: 5,
	attribution: 'oskarlin'
}).addTo(map);

var land = L.tileLayer('tiles_landyta/{z}/{x}/{y}.png', {
	maxZoom: 11,
	minZoom: 5,
	attribution: 'oskarlin'
});



/* layer controls */


var overlayMaps = {
		"Landcover elev": colordem,
		"Landcover": land
};
		
		
L.control.layers(baseMaps, overlayMaps).addTo(map);




/* overlays openlayers */

/*   var overlayer = new OpenLayers.Layer.XYZ("overlayer", "modis_overlay/${z}/${x}/${y}.png", {
  	numZoomLevels: 7, 
  	alpha: true, 
  	isBaseLayer: false, 
  	attribution: '<a href="http://www.norstedts.se/kartor/">Norstedts Kartor</a>'
  	});

  var kollektivlayer = new OpenLayers.Layer.XYZ("kollektivlayer", "modis_sl/${z}/${x}/${y}.png", {
  	numZoomLevels: 7, 
  	alpha: true, 
  	isBaseLayer: false, 
  	attribution: 'SL and Waxholmsbolaget',
  	visibility: false
		}); 
		
		*/

  
/*  map.addLayers([overlayer, kollektivlayer]);
    if (!map.getCenter()) map.zoomToMaxExtent(); */
        




/* permalink */

/*
map.addControl (OpenLayers.Control.Permalink({
	div: document.getElementById('permalink')
}));
*/

/* click on base-layers */

$('#modis > li').click(function() {

	var currentlayername = $(this).attr('data-date');
//	var currentlayer = map.getLayersByName(currentlayername)[0];

 	map.removeLayer(activesatellite);

	activesatellite = L.tileLayer(currentlayername + "/{z}/{x}/{y}.jpg", {   	
		maxZoom: 7,
		minZoom: 7,
		attribution: 'oskarlin',
		tms: true
	}).addTo(map);
	

/* 	baselayer = bing;
 	map.addLayer(baselayer);
 	map.setMaxBounds(terrainBounds);

	map.setBaseLayer(currentlayer);
*/	
	var modis = document.getElementById("modis");
	var i=0;
	while (modis.childNodes[i]) {
		modis.childNodes[i].className = "";
		i++;
	}
	
	$(this).addClass("active"); 

});



/* click on overlays */
           

$('#overlays > li').click(function() {

	var currentlayername = $(this).attr('id');
		
	var currentlayer = map.getLayersByName(currentlayername)[0];

	$(this).toggleClass('active');
	
	if (currentlayer.visibility == true) {
		currentlayer.setVisibility(false);
	} else {
		currentlayer.setVisibility(true);
	}				
});
			
	               
$('#toc-toggle').click(function() {
  $('#toc-content').slideToggle('fast', function() {
  });
});

					