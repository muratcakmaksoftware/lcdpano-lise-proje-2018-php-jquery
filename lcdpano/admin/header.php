<?php

	include "../php/ayarlar.php";
	include "../toaster.php";
	// KULLANICI KONTROLÜ
?>
<!DOCTYPE html>
<html lang="en">
	
	<head>
	  <title>LCD PANO Admin</title>
	  <meta charset="utf-8">
	  <meta name="viewport" content="width=device-width, initial-scale=1">
	  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
	  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script>
	  <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
	  
	  <link rel="stylesheet" href="main.css">
	  <script src="main.js"></script>
	  <script src="ayarlar.js"></script>
	</head>

	<body>		

	<script type="text/javascript">
		if(sessionStorage.getItem("kadi") != null && sessionStorage.getItem("pw") != null)
		{
			checkLoginUpdate(); // login bilgileri doğruysa sayfada kalır değilse login php atılır.
		}
		else
		{
			window.location.href = "login.php";
		}
	</script>
	

	<div class="kapsa">

		<div class="solkapsa">

			<div class="solmenu">
				<a href="../index.php">
					<div class="logo">
						<img src="images/panologo.png" width="150" height="100" />
					</div>
				</a>
				<hr style="padding:0;margin:0;color:#717C7D;margin-top:5px;" />

				<a onclick="router('pages/index.php', 'Ana Sayfa')">
					<div class="solmenu-item">
						<div class="solYasla">
							<!-- material info https://www.w3schools.com/icons/google_icons_action.asp veya https://material.io/icons/ -->
							<i class="material-icons solmenu-material">home</i>
						</div>
						<div class="solYasla solmenu-item-text">
							Ana Sayfa
						</div>
						
					</div>
				</a>
				<a onclick="router('pages/temalar.php', 'Tema Ayarları')">
					<div class="solmenu-item">
						<div class="solYasla">
							<i class="material-icons solmenu-material">view_carousel</i>
						</div>
						<div class="solYasla solmenu-item-text">
							Tema Ayarları
						</div>
						
					</div>
				</a>
			</div>

			<a onclick="cikisYap()">
				<div class="solmenubot">
					<div class="solbot">
						<div class="solYasla">
							<span id="kullanicininadi"></span>
						</div>

						<div class="sagYasla">
							<i class="material-icons solmenu-material">exit_to_app</i>
						</div>
					</div>
				</div>
			</a>
		</div>

		<div class="sagkapsa" id="sagkapsaicerik">

			
		