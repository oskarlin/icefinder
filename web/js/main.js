


var length = satellite_layers.length;

for (var i = 0; i < length; i++) {

//	alert(satellite_layers[i]);
	
}


    		


		
var map = L.map('map', {zoomControl: false}).setView([59.3186785549, 18.0534747746], 7);
new L.Control.Zoom({ position: 'topright' }).addTo(map);

/* sattelite-layers */

activesatellite = L.tileLayer(satellite_layers[0] + "/{z}/{x}/{y}.jpg", {   	
		maxZoom: 7,
		minZoom: 7,
		attribution: 'oskarlin',
		tms: true
	}).addTo(map);




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

var currentlayernumber = 0;

$('#prev').click(function() {

	if (currentlayernumber < (length-1)) {

		var currentlayername = $("#activedate").attr('data-date');
		var currentlayerdate = $("#activedate").html();
		
		$("#activedate").attr('data-date', satellite_layers[currentlayernumber]); 
					
		currentlayernumber++;

	 	map.removeLayer(activesatellite);
	
		activesatellite = L.tileLayer(satellite_layers[currentlayernumber] + "/{z}/{x}/{y}.jpg", {   	
			maxZoom: 7,
			minZoom: 7,
			attribution: 'oskarlin',
			tms: true
		}).addTo(map).bringToBack();
		
		if (currentlayernumber == (length-1)) {
			$("#prev").addClass("first");
		}
		if (currentlayernumber < (length-1)) {
			$("#next").removeClass("last");
		} 

	}
});




$('#next').click(function() {

	if (currentlayernumber > 0) {

		var currentlayername = $("#activedate").attr('data-date');
		var currentlayerdate = $("#activedate").html();
		
		$("#activedate").attr('data-date', satellite_layers[currentlayernumber]); 
					
		currentlayernumber--;
		
		if (currentlayernumber < (length-1)) {
			$("#prev").removeClass("first");
		} 
		if (currentlayernumber == 0) {
			$("#next").addClass("last");
		} 

 	map.removeLayer(activesatellite);

	activesatellite = L.tileLayer(satellite_layers[currentlayernumber] + "/{z}/{x}/{y}.jpg", {   	
		maxZoom: 7,
		minZoom: 7,
		attribution: 'oskarlin',
		tms: true
	}).addTo(map).bringToBack();

		
	}


});




/*	var date = new Date(currentlayerdate);
	
	date.setDate(date.getDate() - 1);
		
	var newDate = date.getDate();
	if (newDate < 10) { newDate = "0" + newDate; }

	var newMonth = date.getMonth()+1;
//	alert (newMonth);
	
	if (newMonth < 10) { newMonth = "0" + newMonth; }
	var newYear = date.getFullYear();

	newlayerdate = newYear + "-" + newMonth + "-" + newDate;
	
	$("#activedate").text(newlayerdate);
	
//	$("#activedate").attr('data-date', prevlayername); 
//	alert (prevlayername);
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

					