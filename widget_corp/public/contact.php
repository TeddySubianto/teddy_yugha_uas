<?php require_once("../includes/session.php"); ?>
<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>

<?php $layout_context = "public"; ?>
<?php include("../includes/layouts/header.php"); ?>
<?php find_selected_page(true); ?>
<div id="main">
	<div id="navigation">
		<?php echo public_navigation($current_subject,$current_page); ?>
	</div><!--#navigation-->
	<div id="page">
		<?php if($current_page){ ?>
		
			<h2><?php echo htmlentities($current_page["menu_name"]); ?></h2>
			<?php echo nl2br(htmlentities($current_page["contact us"])); ?>			
		
		<?php }else{ ?> 


<!DOCTYPE html>
<html>
<head>
	<title>Contact Us</title>
</head>
<body style="background-color:black";>
<h1 style="color: white";>Contact Us</h1>
		<form method="POST" action="tujuan.html">
		<table>
		<tr>
		<td><label style="color:white";>Nama</label></td>
		<td><input type="text" name="nama" value=""/></td>
		</tr>
		<br/>
		<tr>
		<td><label style="color:white";>Email</label></td>
		<td><input type="text" name="nama" value=""/></td>
		</tr>
		<br/>
		<tr>
		<td><label style="color:white";>Form Kontak</label></td>
		<td><textarea name="content" rows="20" cols="80"></textarea></td>
		</tr>
		<tr>
			<td><input type="submit" name="submit" value="save"/></td>
			<td><input type="reset" name="reset" value="reset"/></td>
		</tr>
		</table>
		</form>
		<?php } ?>
	</div><!--#page-->	
</div><!--#main-->
	
<?php include("../includes/layouts/footer.php"); ?>	

</body>
</html>