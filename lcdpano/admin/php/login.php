
<?php 
	header("Access-Control-Allow-Origin: *"); // post için gerekli izin
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: application/json; charset=UTF-8");

	include "../../php/ayarlar.php";

	$jsonResult = "{}";

	if($_POST) 
	{
		$result = $db->prepare("SELECT * FROM kullanicilar WHERE kadi=? AND pw=?");
		if($result->execute(array($_POST["kadi"], $_POST["pw"])))
		{				
			$data = "";
			while($row = $result->fetch(PDO::FETCH_ASSOC)) 
			{
				$data = $row;
			}				
			if($data != "")
				$jsonResult = array('sonuc' => "yes", 'mesaj' => $data);
			else
				$jsonResult = array('sonuc' => "no", 'hata' => "[bos]");
		}
		else{
			$jsonResult = array('sonuc' => "no", 'hata' => "Kullanıcı getirilemedi.");
		}
	}

	echo json_encode($jsonResult, JSON_UNESCAPED_UNICODE);
?>
