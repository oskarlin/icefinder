<?php $link = mysql_connect("host", "user", "password")
 		or die("Kunde inte ansluta mot databasen: " . mysql_error());
	mysql_select_db("database", $link) or die("Kunde inte v?lja databasen");
	
	$password_add = "password";
	 
?>