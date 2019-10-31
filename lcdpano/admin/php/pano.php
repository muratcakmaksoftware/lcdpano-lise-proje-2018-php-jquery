
<?php 
	header("Access-Control-Allow-Origin: *"); // post için gerekli izin
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: application/json; charset=UTF-8");

	include "../../php/ayarlar.php";

	$jsonResult = "{}";

	if($_POST) 
	{
		$q = $_POST["q"];
	
		if($q == "panoBilgileriniGetir")
		{
			$result = $db->prepare("SELECT * FROM pano WHERE id=1");
			if($result->execute())
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
				$jsonResult = array('sonuc' => "no", 'hata' => "Pano getirilemedi.");
			}
		}
		else if($q == "panoKaydet"){
			$result = $db->prepare("UPDATE pano SET pano_adi=?,tema=? WHERE id=1");
			if($result->execute(array($_POST["pano_adi"],$_POST["tema"])))
			{				
				$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Pano Bilgileri Başarıyla Güncellendi!');
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Pano bilgileri getirilemedi.");
			}
		}
		else if($q == "panoGuncellendi"){//Yayın panosunda sıfırlama
			$result = $db->prepare("UPDATE pano SET guncelleme=0 WHERE id=1");
			if($result->execute())
			{				
				$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Pano Güncellendi!');
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Pano güncellenemedi.");
			}
		}
		else if($q == "panoGuncelle"){//Admin panelinden güncelleme
			$result = $db->prepare("UPDATE pano SET guncelleme=1 WHERE id=1");
			if($result->execute())
			{				
				$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Pano Yayınlandı!');
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Pano Yayınlanamadı.");
			}
		}
		else if($q == "panoKulBilgileriniKaydet"){
			// Şifre doğrulanıyor.
			$result = $db->prepare("SELECT * FROM kullanicilar WHERE pw=? AND kul_id=?");
			if($result->execute(array($_POST["pweski"], $_POST["kul_id"])))
			{				
				$data = "";
				while($row = $result->fetch(PDO::FETCH_ASSOC)) 
				{
					$data = $row;
				}				
				if($data != "")
					$jsonResult = array('sonuc' => "yes", 'mesaj' => $data);
				else
					$jsonResult = array('sonuc' => "no", 'hata' => "Şu anki şifreniz doğru değil!");
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Kontrol Yapılamadı.");
			}

			if($jsonResult['sonuc'] == "yes")
			{
				$result = $db->prepare("UPDATE kullanicilar SET kadi=?, pw=? WHERE kul_id=?");
				if($result->execute(array($_POST["kadi"],$_POST["pwyeni"], $_POST["kul_id"])))
				{				
					$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Bilgiler Başarıyla Güncellendi.');
				}
				else{
					$jsonResult = array('sonuc' => "no", 'hata' => "Bilgiler Güncellenemedi.");
				}
			}
			
		}

		
		else{
			$jsonResult = array('sonuc' => "no", 'hata' => "Parametre Hatası");
		}

		
	}

	echo json_encode($jsonResult, JSON_UNESCAPED_UNICODE);
?>
