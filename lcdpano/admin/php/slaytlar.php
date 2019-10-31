
<?php 
	header("Access-Control-Allow-Origin: *"); // post için gerekli izin
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: application/json; charset=UTF-8");

	include "../../php/ayarlar.php";

	include "../function.php";

	$jsonResult = "{}";	
	if($_POST) 
	{
		$q = $_POST["q"];
	
		if($q == "slaytlariGetir")
		{
			$result = $db->prepare("SELECT * FROM slaytlar WHERE tema=?");
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
				$jsonResult = array('sonuc' => "no", 'hata' => "Slaytlar getirilemedi.");
			}
		}
		else if($q == "slaytEkle"){
			$yol = "";
			$tip = $_POST["tip"];
			if($tip == "resim" || $tip == "video")
			{
				if(isset($_FILES['dosya']['tmp_name']))
				{
					$dosyaAdi = dosyaIsmiSifrele(basename($_FILES["dosya"]["name"]));
					$kayitDosyaYolu = "../../".$dosyaKayitKlasoru.$dosyaAdi;
					if (move_uploaded_file($_FILES["dosya"]["tmp_name"], $kayitDosyaYolu)) 
					{
						$yol = $dosyaKayitKlasoru.$dosyaAdi;
						$jsonResult = array('sonuc' => "yes", 'mesaj' => "Dosya Yüklendi");
					} else {
						$jsonResult = array('sonuc' => "no", 'hata' => "Dosya Yüklenmedi.");
					}
				}
				else
				{
					$jsonResult = array('sonuc' => "no", 'hata' => "Dosya Bulunamadı.");
				}
			}
			else if($tip == "tv"){				
				$yol = $_POST["url"];
				$jsonResult = array('sonuc' => "yes", 'mesaj' => "Url Seçildi.");
			}

			if($jsonResult['sonuc'] =="yes")
			{
				$result = $db->prepare("INSERT INTO slaytlar SET tema=?,tip=?,yol=?,beklemesuresi=?");
				if($result->execute(array($_POST["tema"], $tip, $yol, $_POST["beklemesuresi"])))
				{				
					$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Slayt Başarıyla Eklendi!');
				}
				else{
					$jsonResult = array('sonuc' => "no", 'hata' => "Slayt eklenirken hata.");
				}
			}
			
		}
		else if($q == "slaytSil"){
			//Slayt Bilgileri Alınıyor.
			$slayt_id = $_POST["slayt_id"];
			$data = "";
			$result = $db->prepare("SELECT * FROM slaytlar WHERE tema=? AND slayt_id=?");
			if($result->execute(array($_POST["tema"],$slayt_id)))
			{				
				
				while($row = $result->fetch(PDO::FETCH_ASSOC)) 
				{
					$data = $row;
					break;
				}				
				if($data != "")
					$jsonResult = array('sonuc' => "yes", 'mesaj' => $data);
				else
					$jsonResult = array('sonuc' => "no", 'hata' => "[bos]");
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Slaytlar getirilemedi.");
			}

			if($jsonResult["sonuc"] == "yes")
			{
				if($data["tip"] == "resim" || $data["tip"] == "video")
				{
					$yol = "../../".$data["yol"];
					if (file_exists($yol))  //dosya var mı
					{
						unlink($yol); //dosya silindi
						$jsonResult = array('sonuc' => "yes", 'mesaj' => "Dosya Başarıyla Silindi!");
					}
					else{
						$jsonResult = array('sonuc' => "no", 'hata' => "Dosya bulunamadı.");
					}
				}

				if($jsonResult["sonuc"] == "yes")
				{
					$result = $db->prepare("DELETE FROM slaytlar WHERE tema=? AND slayt_id=?");
					if($result->execute(array($_POST["tema"],$slayt_id)))
					{				
						$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Slayt Başarıyla Silindi!');
					}
					else{
						$jsonResult = array('sonuc' => "no", 'hata' => "Slayt silinirken Hata.");
					}
				}
			}

		}
		else if($q =="slaytGuncelle"){
			$result = $db->prepare("UPDATE slaytlar SET beklemesuresi=? WHERE tema=? AND slayt_id=?");
			if($result->execute(array($_POST["beklemesuresi"], $_POST["tema"],$_POST["slayt_id"])))
			{				
				$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Slayt Başarıyla Güncellendi!');
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Slayt Güncellenirken Hata.");
			}
		}
		else{
			$jsonResult = array('sonuc' => "no", 'hata' => "Parametre Hatası");
		}

		
	}
	else{
		$jsonResult = array('sonuc' => "no", 'hata' => "POST Parametre Hatası");
	}

	echo json_encode($jsonResult, JSON_UNESCAPED_UNICODE);
?>
