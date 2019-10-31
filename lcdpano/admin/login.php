
<?php include "../toaster.php"; ?>
<!DOCTYPE html>
<html lang="en">

<head>
	<meta charset="utf-8">
	<title>LCD PANO Login</title>
	<meta charset="utf-8">
	
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<link rel="stylesheet" href="loginfiles/animate.css">
	<!-- Custom Stylesheet -->
	<link rel="stylesheet" href="loginfiles/style.css">
	
	<script src="ayarlar.js"></script>
</head>

<body>
	<div class="container">
	
		<div class="top">
			<a href="../index.php"><h1 id="title" class="hidden"><span id="logo">LCD <span>PANO</span></span></h1></a>
		</div>
		<div class="login-box animated fadeInUp">
			<div class="box-header">
				<h2>Giriş</h2>
			</div>
			<label for="username">Kullanıcı Adı</label>
			<br/>
			<input type="text" id="kadi">
			<br/>
			<label for="password">Şifre</label>
			<br/>
			<input type="password" id="pw">
			<br/>
			<button type="button" onclick="login()">Giriş Yap</button>
			<br/>			
		</div>
	</div>
	<script src="main.js"></script>
	
</body>

	<script>
		$(document).ready(function () {
			$('#logo').addClass('animated fadeInDown');
			$("input:text:visible:first").focus();
		});
		$('#username').focus(function() {
			$('label[for="username"]').addClass('selected');
		});
		$('#username').blur(function() {
			$('label[for="username"]').removeClass('selected');
		});
		$('#password').focus(function() {
			$('label[for="password"]').addClass('selected');
		});
		$('#password').blur(function() {
			$('label[for="password"]').removeClass('selected');
		});
	</script>


	
	
	
</html>