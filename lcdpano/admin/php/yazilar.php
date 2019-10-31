
<?php 
	header("Access-Control-Allow-Origin: *"); // post için gerekli izin
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: application/json; charset=UTF-8");

	include "../../php/ayarlar.php";

	$jsonResult = "{}";

	if($_POST) 
	{
		$q = $_POST["q"];
	
		if($q == "yazilariGetir")
		{
			$result = $db->prepare("SELECT * FROM yazilar WHERE tema=?");
			if($result->execute(array($_POST["tema"])))
			{				
				$data = "";
				while($row = $result->fetchAll(PDO::FETCH_ASSOC)) 
				{
					$data = $row;
				}				
				if($data != "")
					$jsonResult = array('sonuc' => "yes", 'mesaj' => $data);
				else
					$jsonResult = array('sonuc' => "no", 'hata' => "[bos]");
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Yazılar getirilemedi.");
			}
		}
		else if($q == "yaziEkle"){
			$result = $db->prepare("INSERT INTO yazilar SET tema=?,yazi=?");
			if($result->execute(array($_POST["tema"],$_POST["yazi"])))
			{				
				$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Yazı Başarıyla Eklendi!');
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Yazı eklenirken hata.");
			}
		}
		else if($q == "yaziSil"){
			$result = $db->prepare("DELETE FROM yazilar WHERE tema=? AND yazi_id=?");
			if($result->execute(array($_POST["tema"],$_POST["yazi_id"])))
			{				
				$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Yazı Başarıyla Silindi!');
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Yazı silinirken hata.");
			}
		}

		
		else{
			$jsonResult = array('sonuc' => "no", 'hata' => "Parametre Hatası");
		}

		
	}

	echo json_encode($jsonResult, JSON_UNESCAPED_UNICODE);
?>
