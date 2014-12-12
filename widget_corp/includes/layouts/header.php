<?php 
	if(!isset($layout_context)){
		$layout_context = "public"; 
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
	"http://www.w3.org/TR/html4/loose.dtd">
	
<html lang = "en">
	<head>
		<title>PT.TY BERSAMA<?php if($layout_context == "admin"){echo "Admin";} ?></title>
		<link href="stylesheets/public.css" media="all" rel="stylesheet" type="text/css"/>
	</head>
	<body>
		<h1><center><img src="picture/logo.jpg"/></center></h1>
		<div id = "header">
			<h1><center>PT.TY BERSAMA </center><?php if($layout_context == "admin"){echo "Admin";} ?></h1>
		</div><!--#header-->