<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]><!--> <html class="no-js"> <!--<![endif]-->
	<head>
	  <meta charset="utf-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	  <title>Ice finder 2.0b by Oskar Karlin</title>
	  <meta name="description" content="Ice Finder is a map app showing NASAs daily satellite imagery covering Sweden, Norway and Finland, together with a landcover (water excludet) etc.">
	  <meta name="viewport" content="width=device-width">
	
	  <!-- Place favicon.ico and apple-touch-icon.png in the root directory -->
	
	  <link rel="stylesheet" href="css/normalize.css">
	  <link rel="stylesheet" href="css/main.css">
	  <link rel="stylesheet" href="css/font-awesome.min.css">
	  <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.css" />
	  <script src="js/vendor/modernizr-2.6.2.min.js"></script>
	  <script src="http://cdn.leafletjs.com/leaflet-0.6.4/leaflet.js"></script>
	</head>
	<body>
    <!--[if lt IE 7]>
        <p class="chromeframe">You are using an <strong>outdated</strong> browser. Please <a href="http://browsehappy.com/">upgrade your browser</a> or <a href="http://www.google.com/chromeframe/?redirect=true">activate Google Chrome Frame</a> to improve your experience.</p>
    <![endif]-->

    <!-- Add your site or application content here -->
	
	
    <div id="logo"><img src="img/logo2.0.png"></div>
    
    <div id="datepicker">
    		<div id="active"><span class="fa fa-chevron-left" id="prev"></span> 


    		
	    		
					<?php 
					
					include("db_password.php");
					
					$query = "SELECT * FROM satellite ORDER BY date DESC limit 1" ;
					$list = mysql_query($query, $link) or die("Fr?gan misslyckades: " . mysql_error());
					
					while ($satellites = mysql_fetch_array($list, MYSQL_ASSOC)) {
					
						$timestamp = strtotime($satellites['date']);
						
						$year = date("Y", $timestamp);
						$yeardate = date("z", $timestamp) + 1;
						$yeardatelength = strlen($yeardate);
						
						if ($yeardatelength < 2) { $listdate = $year . "00" . $yeardate; }
						else if ($yeardatelength < 3) { $listdate = $year . "0" . $yeardate; }
						else { $listdate = $year . $yeardate; }
						
						echo '<span id="activedate" data-date="' . $listdate;
						echo '">' . $satellites['date'] . '</span>' . "\n"; 
					
					}
					
					?>

	    	  <span class="fa fa-chevron-right last" id="next"></span>
    	  </div>
    	  
		  	<ul id="satellites">

	
					<?php
				
				
					$query = "SELECT * FROM satellite ORDER BY date DESC" ;
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
					
						echo '<li data-date="' . $listdate . '" class="';
						
						if ($first) { 
							echo 'active'; $first = 0; 
							$mostrecent_satellite = $satellites['date'];
						}
						
						echo '">' . $satellites['date'] . ' ' . $type . '</li>' . "\n"; 
							
					}
				
				?>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
					<li>hfjeh</li>
		  	</ul>

	    	<div id="togglelist"><span class="fa fa-chevron-up" id="togglelistbutton"></span></div>

	    
    </div>
	
	
	  <div id="toc">
	  	<!-- endast mobil -->
	  	<div id="toc-toggle"><i class="icon-reorder"></i></div>
	  	<!-- slut mobil -->
	  	<div id="toc-content">
		  	<h3>Overlays</h3>
		  	<ul id="overlays">
		  		<li id="tiles_colordem" class="active"> Landcover with elevation</li>
		  		<li id="tiles_landcover" class=""> Landcover</li>
		  		<!--<li id="tiles_ferries" class="inactive"> Ferries</li>-->
		  	</ul>
		  	<!-- <div id="perma_div"><a href="#" id="permalink">Permalänk hit</a></div>-->
<!--		  	<div id="donate">
					<form action="https://www.paypal.com/cgi-bin/webscr" method="post">
					<input type="hidden" name="cmd" value="_s-xclick">
					<input type="hidden" name="encrypted" value="-----BEGIN PKCS7-----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-----END PKCS7-----
					">
					<input type="image" src="https://www.paypalobjects.com/sv_SE/i/btn/btn_donate_SM.gif" border="0" name="submit" alt="PayPal - Det tryggare, enklare sättet att betala online!">
					<img alt="" border="0" src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" width="1" height="1">
					</form>

				</div> -->
	  	</div>
	  </div>
	  <div id="map"></div>


	  <script>
		  
		  
		  // Adding layers from SQL database 
		  
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
	
		if ($first) {
			echo '"' . $listdate . '"';
			$first = 0;
			
		} else {
			echo ', "' . $listdate . '"';
		}			
	}
		  		  
		  ?>);

	  </script>
	
	  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.3.min.js"><\/script>')</script>
    <script src="js/plugins.js"></script>
    <script src="js/main.js"></script>
    

    <!-- Google Analytics: change UA-XXXXX-X to be your site's ID. -->
    <script>
        var _gaq=[['_setAccount','UA-671782-8'],['_trackPageview']];
        (function(d,t){var g=d.createElement(t),s=d.getElementsByTagName(t)[0];
        g.src=('https:'==location.protocol?'//ssl':'//www')+'.google-analytics.com/ga.js';
        s.parentNode.insertBefore(g,s)}(document,'script'));
    </script>
  </body>
</html>
