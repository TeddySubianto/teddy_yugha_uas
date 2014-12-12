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
			<?php echo nl2br(htmlentities($current_page["content"])); ?>			
		
		<?php }else{ ?> 
			
			<p><marquee>Welcome To PT.TY Bersama!!</marquee></p>
			<p>Jl. Teddy Subianto No.31 Jakarta Barat<br/>Kode pos :11210||Jakarta-Indonesia <br/></p>
			<br/>
			<br/>
			<h1>Company Profile</h1>
			<table width="100%">
				<tr>
					<td><p>PT.TY Bersama!! adalah persuahaan yang bergerak di bidang perhotelan. Pt ini didirikan sejak tahun 2012, <br/>
					    PT.TY Bersama!! didirikan oleh TEDDY SUBIANTO dan YUGHA SUWINTO. Hotel ini kami dirikan dengan menyediakan <br/>
					    fasilitas berbintang 5 yang masuk dalam jajaran 10 hotel berbintang 5 terbaik di dunia.</p> 
						<p>PT.TY Bersama!! membuat web ini dengan alasan untuk mempermudah masyarakat untuk membooking dan mengenal <br/>
						 hotel ini lebih jelas lagi. Jadi harapan kami ke masyarakat untuk lebih mengenal hotel yang kami buat. </p></td>
				</tr>
				<tr>
					<td><img src="picture/hotel1.jpg"/></td> 
					
				</tr>
				<tr>
					<td> dari foto di atas dapat dilihat bawa hotel kami terletak di tengah" kota jakarta barat, jadi bisa dibilang <br/>
					     hotel kami dekat dengan tempat perbelanjaan dan mall" ternama yang ada dijakarta barat dan hotel ini dekat<br/>
						 dengan taman terbesar yang ada dijakarta barat.</td>
				</tr>
			</table>
			<br/>
			<a style="color:white"; href="contact.html"> Contact Us</a>
			<a style="color:white"; href="gallery.html">Link To Gallery</a>
		<?php } ?>
	</div><!--#page-->	
</div><!--#main-->
	
<?php include("../includes/layouts/footer.php"); ?>	
