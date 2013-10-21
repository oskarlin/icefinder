<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
	  <meta charset="utf-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	  <title>Ice finder 1.0b8 by Oskar Karlin</title>
	  <meta name="description" content="Ice Finder is a map app showing NASAs daily satellite imagery covering Sweden, together with a landcover (water excludet) etc.">
	  <meta name="viewport" content="width=device-width">
	
	  <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
	
	  <link rel="stylesheet" href="css/normalize.css">
	  <link rel="stylesheet" href="css/main.css">
	  <link rel="stylesheet" href="css/font-awesome.css">
	  <script src="js/vendor/modernizr-2.6.2.min.js"></script>
    <script src="js/OpenLayers.js"></script>
	</head>
	<body>
    <!--[if lt IE 7]>
        <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->

    <!-- Add your site or application content here -->
	
	  <div id="toc">
	  	<!-- endast mobil -->
	  	<div id="toc-toggle"><i class="icon-reorder"></i></div>
	  	<!-- slut mobil -->
	  	<div id="toc-content">
		  	<h3>Satellitlager</h3>
		  	<ul id="modis">

<?php 

include("db_password_old.php");
	
	$query = "SELECT * FROM modis ORDER BY date DESC" ;
	$list = mysql_query($query, $link) or die("Fr?gan misslyckades: " . mysql_error());

	$first = 1;
	
	while ($satellites = mysql_fetch_array($list, MYSQL_ASSOC)) {
	
		$timestamp = strtotime($satellites['date']);
		
		$year = date("Y", $timestamp);
		$yeardate = date("z", $timestamp) + 1;
		$yeardatelength = strlen($yeardate);
		
		if ($yeardatelength < 2) { $listdate = $year . "00" . $yeardate; }
		else if ($yeardatelength < 3) { $listdate = $year . "0" . $yeardate; }
		else { $listdate = $year . $yeardate; }

		if ($satellites['satellite']) { $type = "aqua"; } else { $type = "terra"; }
	
		echo '<li id="'. $type . "." . $listdate . '" class="';
		
		if ($first) { echo 'active'; $first = 0; }
		
		echo '">' . $satellites['date'] . ' ' . $type . '</li>' . "\n"; 
			
	}

?>
		  	</ul>
		  	<h3>Andra lager</h3>
		  	<ul id="overlays">
		  		<li id="overlayer" class="active"> Landytan</li>
		  		<li id="kollektivlayer" class="inactive"> SL och färjelinjer</li>
		  	</ul>
		  	<div id="perma_div"><a href="#" id="permalink">Permalänk hit</a></div>
	  	</div>
	  </div>
	  <div id="map"></div>


	  <script>
		  
		  var satellite_layers = new Array(<?php
		  
	$jslist = mysql_query($query, $link) or die("Fr?gan misslyckades: " . mysql_error());
	
	$first = 1;

	while ($satellites = mysql_fetch_array($jslist, MYSQL_ASSOC)) {
	
		$timestamp = strtotime($satellites['date']);
		
		$year = date("Y", $timestamp);
		$yeardate = date("z", $timestamp) + 1;
		$yeardatelength = strlen($yeardate);
		
		if ($yeardatelength < 2) { $listdate = $year . "00" . $yeardate; }
		else if ($yeardatelength < 3) { $listdate = $year . "0" . $yeardate; }
		else { $listdate = $year . $yeardate; }

		if ($satellites['satellite']) { $type = "aqua"; } else { $type = "terra"; }
	
		if ($first) {
			echo '"' . $type . '.' . $listdate . '"';
			$first = 0;
			
		} else {
			echo ', "' . $type . '.' . $listdate . '"';
		}			
	}
		  		  
		  ?>);

	  </script>
	
	  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.3.min.js"><\/script>')</script>
    <script src="js/plugins.js"></script>
    <script src="js/main2.js"></script>
    

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
        var _gaq=[['_setAccount','UA-671782-8'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
  </body>
</html>
