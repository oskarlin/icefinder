  map = new OpenLayers.Map ("map", {
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


/* sattelite-layers */

var satellite_layers = new Array("terra.2013017","terra.2013013","aqua.2012363");

// var satellite_layers = new Array("terra.2013015","terra20130114","terra20130113","terra20130104","aqua20121228");

var length = satellite_layers.length;

for (var i = 0; i < length; i++) {

	satellite_layers[i] = new OpenLayers.Layer.XYZ(satellite_layers[i], satellite_layers[i] + "/${z}/${x}/${y}.png", {   	
		numZoomLevels: 7,
		layerId : i, 
  	alpha: true, 
  	isBaseLayer: true, 
/*  	transitionEffect: 'resize', */
  	attribution: '<a href="http://earthdata.nasa.gov/data/near-real-time-data/rapid-response">NASA</a>'
  	});

	map.addLayer(satellite_layers[i]);
		
}


/* overlays */

  var overlayer = new OpenLayers.Layer.XYZ("overlayer", "modis_overlay/${z}/${x}/${y}.png", {
  	numZoomLevels: 7, 
  	alpha: true, 
  	isBaseLayer: false, 
/*  	transitionEffect: 'resize', */
  	attribution: '<a href="http://www.norstedts.se/kartor/">Norstedts Kartor</a>'
  	});

  var kollektivlayer = new OpenLayers.Layer.XYZ("kollektivlayer", "modis_sl/${z}/${x}/${y}.png", {
  	numZoomLevels: 7, 
  	alpha: true, 
  	isBaseLayer: false, 
/*  	transitionEffect: 'resize', */
  	attribution: 'SL and Waxholmsbolaget',
  	visibility: false
		}); 
  
  map.addLayers([overlayer, kollektivlayer]);
          
      
    if (!map.getCenter()) map.zoomToMaxExtent();
        


/* permalink */

/*
map.addControl (OpenLayers.Control.Permalink({
	div: document.getElementById('permalink')
}));
*/

/* click on base-layers */

$('#modis > li').click(function() {

	var currentlayername = $(this).attr('id');
	var currentlayer = map.getLayersByName(currentlayername)[0];
	
	map.setBaseLayer(currentlayer);

	var modis = document.getElementById("modis");
	var i=0;
	while (modis.childNodes[i]) {
		modis.childNodes[i].className = "inactive";
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

					