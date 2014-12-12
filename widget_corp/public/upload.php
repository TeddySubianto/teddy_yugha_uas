<?php require_once("../includes/session.php"); ?>
<?php require_once("../includes/db_connection.php"); ?>
<?php require_once("../includes/functions.php"); ?>

<?php $layout_context = "public"; ?>
<?php include("../includes/layouts/header.php"); ?>
<?php find_selected_page(true); ?>

<div id="main">
	<div id="navigation">
<?php 
	//Can't add a new page unless we have a subject as a parent!
	if(!$current_subject){
		// subject ID was missing or invalid or
		// subject couldn't be found in database
		redirect_to("upload.php");
	}
?>

<?php
	if(isset($_POST['submit'])){
		// Process the form		
		
		// validations 
		$required_fields = array("menu_name","position","visible","content");
		validate_presences($required_fields);
		
		$fields_with_max_lengths = array("menu_name" => 30);
		validate_max_lengths($fields_with_max_lengths);
		
		if(empty($errors)){
		// Perform Update	
		
		// make sure you add the subject_id!
		$subject_id = $current_subject["id"];
		$menu_name = mysql_prep($_POST["menu_name"]);
		$position = (int) $_POST["position"];
		$visible = (int) $_POST["visible"];
		// be sure to escape the content
		$content = mysql_prep($_POST["content"]);
		
		$query = "INSERT INTO pages (";
		$query .= " subject_id, menu_name, position, visible, content";
		$query .= ") VALUES (";
		$query .= " {$subject_id}, '{$menu_name}', {$position}, {$visible}, '{$content}'";
		$query .= ")";
		$result = mysqli_query($connection,$query);
		
		if($result){
			// Success
			$_SESSION["message"] = "Page created.";
			redirect_to("manage_content.php?subject=" . urlencode($current_subject["id"]));
		}else{
			// Failure
			$_SESSION["message"] = "Page creation failed.";
		}		
	}
	}else{
		//This is probably a GET request
	
	}	//end: if(isset($_POST['submit'])(
	
?>

<?php $layout_context = "admin"; ?>
<?php include("../includes/layouts/header.php"); ?>

$file_name = $_FILES['gambar']['name'];
$file_name = $_FILES['gambar']['size'];
$file_tmp  = $_FILES['gambar']['tmp_name'];

$file_ext=strtolower(end(explode(".",$file_name)));
$ext_boleh=array("jpg","jpeg","png","gif","bmp");


if(in_array($file_ext,$ext_boleh)){
if($file_size<=2*1024*1024){
	//move file to new directory
	$sumber=$file_tmp;
	$tujuan="gambar/".$file_name;
	move_uploaded_file($sumber,$tujuan);
	
	//2/sql query
	$sql="INSERT INTO gallery(title,body,file)
		  VALUES('$judul','$ket','$tujuan')";
	mysqli_query($koneksi,$sql);
	
	//cek kalo query gagal
	if(mysqli_error($koneksi){
		echo "Upload gambar gagal.";
		echo mysqli_error($koneksi);
		die();
	}
	header('Location: index.php');
}else{
	echo "ukuran gambar terlalu besar. Max 2mb.";
	}
}else{
	echo"jenis file yang fiperbolehkan hanya gambar.";
}
</div><!--#page-->	
</div><!--#main-->

<?php include("../includes/layouts/footer.php"); ?>	

