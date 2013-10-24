


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
		attribution: '<a href="http://earthdata.nasa.gov/data/near-real-time-data/rapid-response">NASA</a>',
		tms: true
	}).addTo(map);




var overlaylayers = {};
           

$('#overlays').children().each(function(){

	var layername = $(this).attr("id");
	
//	alert (layername);
	
	var currlayer = new L.tileLayer("../2.0b/" + layername + '/{z}/{x}/{y}.png', {
		maxZoom: 11,
		minZoom: 5,
		attribution: '<a href="http://www.viewfinderpanoramas.org/dem3.html">Viewfinder panoramas</a>, <a href="http://www.kartverket.no">Kartverket</a>, <a href="http://www.norstedts.se/kartor/">Norstedts kartor</a>, <a href="http://www.maanmittauslaitos.fi/sv">Lantmäteriverket</a>'
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
			attribution: '<a href="http://earthdata.nasa.gov/data/near-real-time-data/rapid-response">NASA</a>',
			tms: true
		}).addTo(map).bringToBack();
		
		if (currentlayernumber == (length-1)) {
			$("#prev").addClass("first");
		}
		if (currentlayernumber < (length-1)) {
			$("#next").removeClass("last");
		} 

		var dateprocessed = transformdate();
		$("#activedate").text(dateprocessed);

	}
});


function transformdate() {
		currentdateyear = satellite_layers[currentlayernumber].substring(0,4);
		currentdatedays = satellite_layers[currentlayernumber].substring(4,8);
		var date = new Date(currentdateyear);
		date = new Date(date.setDate(currentdatedays));
			
		var newDate = date.getDate();
		if (newDate < 10) { newDate = "0" + newDate; }
	
		var newMonth = date.getMonth()+1;
		
		if (newMonth < 10) { newMonth = "0" + newMonth; }
		var newYear = date.getFullYear();
	
		return newYear + "-" + newMonth + "-" + newDate;
}



$('#next').click(function() {

	if (currentlayernumber > 0) {

		var currentlayername = $("#activedate").attr('data-date');
		var currentlayerdate = $("#activedate").html();
		
		$("#activedate").attr('data-date', satellite_layers[currentlayernumber]); 
					
		currentlayernumber--;
		
	 	map.removeLayer(activesatellite);
	
		activesatellite = L.tileLayer(satellite_layers[currentlayernumber] + "/{z}/{x}/{y}.jpg", {   	
			maxZoom: 7,
			minZoom: 7,
			attribution: '<a href="http://earthdata.nasa.gov/data/near-real-time-data/rapid-response">NASA</a>',
			tms: true
		}).addTo(map).bringToBack();
	
		if (currentlayernumber < (length-1)) {
			$("#prev").removeClass("first");
		} 
		if (currentlayernumber == 0) {
			$("#next").addClass("last");
		} 

		var dateprocessed = transformdate();
		$("#activedate").text(dateprocessed);
		
	}


});

var togglelist = 1;

$("#togglelist").click(function() {

	if (togglelist) {	
		$("#satellites").hide('fast');
		$("#togglelistbutton").removeClass("fa-chevron-up").addClass("fa-chevron-down");
		togglelist = 0;
	} else {
		$("#satellites").show('fast');
		$("#togglelistbutton").removeClass("fa-chevron-down").addClass("fa-chevron-up");
		togglelist = 1;
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
		attribution: '<a href="http://earthdata.nasa.gov/data/near-real-time-data/rapid-response">NASA</a>',
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

					