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


if ($_GET['delete'] and $_GET['password'] == $password_add) {

	$length = strlen($_GET['delete']);
	$length = $length - 9;
	
	$id = substr($_GET['delete'], -$length);
	
	
	mysql_query("DELETE FROM satellite WHERE id=" . $id);

	}
	

if ($_GET['date'] and $_GET['password'] == $password_add) {

		$add_query = "INSERT INTO satellite (date) VALUES ('" . $_GET['date'] . "');";
	
		$result = mysql_query($add_query, $link) or die("Error. Felet: " . mysql_error());

	}


	$query = "SELECT * FROM satellite ORDER BY date" ;
	$list = mysql_query($query, $link) or die("Fr?gan misslyckades: " . mysql_error());
	
	?>
	
	<ul id="list_dates">
	
	<?php

	$count = 0;
	
	while ($satellites = mysql_fetch_array($list, MYSQL_ASSOC)) {
		
		echo '<li>' . $satellites['date'] . ' <span class="delete" id="satellite' . $satellites['id'] . '">x</span></li>' . "\n"; 
		
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
			$password = $('#pass').attr('value');
			
			window.location = 'add.php?delete=' + $id + '&password=' + $password; 
			
		});
		
	</script>
	
	
	<form method="get">
			Datum (2XXX-XX-XX)<br>
		<input type="text" value="" name="date"><br>
			Lösenord<br>
		<input type="text" value="" name="password" id="pass"><br>
		<input type="submit" value="skicka">
	</form>
	

</body>