


var length = satellite_layers.length;

for (var i = 0; i < length; i++) {

//	alert(satellite_layers[i]);
	
}


var map = L.map('map', {zoomControl: false}).setView([59.3186785549, 18.0534747746], 7);
new L.Control.Zoom({ position: 'topright' }).addTo(map);

/* sattelite-layers */

activesatellite = L.tileLayer("http://tiles.icefinder.se/" + satellite_layers[0] + "/{z}/{x}/{y}.jpg", {   	
		maxZoom: 11,
		minZoom: 5,
		attribution: '<a href="http://earthdata.nasa.gov/data/near-real-time-data/rapid-response">NASA</a>',
		detectRetina: true
	}).addTo(map);




var overlaylayers = {};
           

$('#overlays').children().each(function(){

	var layername = $(this).attr("id");
	
//	alert (layername);
	
	var currlayer = new L.tileLayer("../2.0b/" + layername + '/{z}/{x}/{y}.png', {
		maxZoom: 11,
		minZoom: 5,
		detectRetina: true,
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
	
		activesatellite = L.tileLayer("http://tiles.icefinder.se/" + satellite_layers[currentlayernumber] + "/{z}/{x}/{y}.jpg", {   	
			maxZoom: 11,
			minZoom: 5,
			detectRetina: true,
			attribution: '<a href="http://earthdata.nasa.gov/data/near-real-time-data/rapid-response">NASA</a>'
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
		
		activesatellite = L.tileLayer("http://tiles.icefinder.se/" + satellite_layers[currentlayernumber] + "/{z}/{x}/{y}.jpg", {   	
			maxZoom: 11,
			minZoom: 5,
			detectRetina: true,
			attribution: '<a href="http://earthdata.nasa.gov/data/near-real-time-data/rapid-response">NASA</a>'
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

var togglelist = 0;

$("#togglelist").click(function() {

	if (togglelist) {	
		$("#satellites").slideUp();
		$("#togglelistbutton").removeClass("fa-chevron-down").addClass("fa-chevron-up");
		togglelist = 0;
	} else {
		$("#satellites").slideDown();
		$("#togglelistbutton").removeClass("fa-chevron-up").addClass("fa-chevron-down");
		togglelist = 1;
	}
	
});


$('#satellites > li').click(function() {
	
	var currentlayername = $(this).attr('data-date');
	var currentlayerdate = $(this).html();

	$("#activedate").attr('data-date', currentlayername); 
	$("#activedate").text(currentlayerdate); 

 	map.removeLayer(activesatellite);
	
	activesatellite = L.tileLayer("http://tiles.icefinder.se/" + currentlayername + "/{z}/{x}/{y}.jpg", {   	
		maxZoom: 11,
		minZoom: 5,
		detectRetina: true,
		attribution: '<a href="http://earthdata.nasa.gov/data/near-real-time-data/rapid-response">NASA</a>'
	}).addTo(map).bringToBack();


	
	for (var i = 0; i < length; i++) {

		if (currentlayername == satellite_layers[i]) {
			currentlayernumber = i;
			
			if (currentlayernumber == 0) {
				$("#next").addClass("last");
				$("#prev").removeClass("first");
			} else if (currentlayernumber == (length-1)) {
				$("#prev").addClass("first");
				$("#next").removeClass("last");
			} else {
				$("#next").removeClass("last");
				$("#prev").removeClass("first");
			}
		}	
	}




});




/* click on base-layers */

$('#modis > li').click(function() {

	var currentlayername = $(this).attr('data-date');

 	map.removeLayer(activesatellite);

	activesatellite = L.tileLayer(currentlayername + "/{z}/{x}/{y}.jpg", {   	
		maxZoom: 11,
		minZoom: 5,
		detectRetina: true,
		attribution: '<a href="http://earthdata.nasa.gov/data/near-real-time-data/rapid-response">NASA</a>'
	}).addTo(map).bringToBack();
	

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

var toctoggle = 1;
	               
$('#toc-toggle').click(function() {
	if (toctoggle) {
		$("#toc-icon").removeClass('fa-reorder').addClass('fa-times');
		toctoggle = 0;
	} else {
		$("#toc-icon").addClass('fa-reorder').removeClass('fa-times');
		toctoggle = 1;
	}
		$('#toc-content').toggle();
});

					