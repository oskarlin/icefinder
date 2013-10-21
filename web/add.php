<!DOCTYPE html>
<html>
	<head>
	  <meta charset="utf-8">
	  <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
	  <title>Ice finder admin</title>
	</head>

	<style>
		
		.delete {
			cursor: pointer;
		}
	
	
	</style>


	<body>
	
	LÄGG TILL OCH TA BORT SATTELITER

	
<?php 
	
	include("db_password.php");


if ($_GET['delete']) {

	$length = strlen($_GET['delete']);
	$length = $length - 9;
	
	$id = substr($_GET['delete'], -$length);
	
	mysql_query("DELETE FROM modis WHERE s_id=" . $id);

	}
	

if ($_GET['date'] and $_GET['password'] == $password_add) {

		$add_query = "INSERT INTO modis (date, satellite) VALUES ('" . $_GET['date'] . "', '" . 		$_GET['satellite'] . "');";
	
		$result = mysql_query($add_query, $link) or die("Error. Felet: " . mysql_error());

	}


	$query = "SELECT * FROM modis ORDER BY date" ;
	$list = mysql_query($query, $link) or die("Fr?gan misslyckades: " . mysql_error());
	
	?>
	
	<ul id="list_dates">
	
	<?php

	$count = 0;
	
	while ($satellites = mysql_fetch_array($list, MYSQL_ASSOC)) {
	
		if ($satellites['satellite']) { $type = "aqua"; } else { $type = "terra"; }
	
		echo '<li>' . $satellites['date'] . ' ' . $type . ' <span class="delete" id="satellite' . $satellites['s_id'] . '">x</span></li>' . "\n"; 
		
		$count++;
	
	}


?>
	</ul>

	  <script src="//ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="js/vendor/jquery-1.8.3.min.js"><\/script>')</script>
    <script src="js/plugins.js"></script>

	<script>
		
		$('.delete').click(function() {
			
			$id = $(this).attr('id');
			
			window.location = 'add.php?delete=' + $id; 
			
		});
		
	</script>
	
	
	<form method="get">
		<input type="text" value="" name="date"><br>
			<select name="satellite">
			  <option value="0">Terra</option>
			  <option value="1">Aqua</option>
			  <option value="2">Special</option>
			</select><br>
		<input type="submit" value="skicka">
	</form>
	

</body>