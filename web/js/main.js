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
		
var map = L.map('map', {zoomControl: false}).setView([59.3186785549, 18.0534747746], 7);
new L.Control.Zoom({ position: 'topright' }).addTo(map);

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



var overlaylayers = {};
           

$('#overlays').children().each(function(){

	var layername = $(this).attr("id");
	
//	alert (layername);
	
	var currlayer = new L.tileLayer(layername + '/{z}/{x}/{y}.png', {
		maxZoom: 11,
		minZoom: 5,
		attribution: 'oskarlin'
	});
 
  overlaylayers[layername] = currlayer;
  
//  overlaylayers[layername].addTo(map);
  
});


overlaylayers['tiles_colordem'].addTo(map).bringToFront();




/* layer controls */



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
	}).addTo(map).bringToBack();
	

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
		
	if ($(this).hasClass("active")){
		map.removeLayer(overlaylayers[currentlayername]);

	} else {
		if (currentlayername == "tiles_landcover") {
			map.removeLayer(overlaylayers["tiles_colordem"]);
			$("#tiles_colordem").removeClass('active');
		}
		if (currentlayername == "tiles_colordem") {
			map.removeLayer(overlaylayers["tiles_landcover"]);
			$("#tiles_landcover").removeClass('active');
		}
		map.addLayer(overlaylayers[currentlayername]);
	}

	
	$(this).toggleClass('active');

	
});


/* lägg satellitlagret i botten */

activesatellite.bringToBack();

	               
$('#toc-toggle').click(function() {
  $('#toc-content').slideToggle('fast', function() {
  });
});

					