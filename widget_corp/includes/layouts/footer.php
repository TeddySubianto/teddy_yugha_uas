		<div id="footer">Copyright <?php echo date("Y"); ?>, PT. HOTEL TY BERSAMA</div><!--#footer-->
		
	</body>
</html>
<?php
	//5. Close database connection
	if(isset($connection)){
		mysqli_close($connection);
	}
?>