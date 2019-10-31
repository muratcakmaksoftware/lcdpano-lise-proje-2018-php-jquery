
<?php 
	header("Access-Control-Allow-Origin: *"); // post için gerekli izin
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: application/json; charset=UTF-8");

	include "../../php/ayarlar.php";

	$jsonResult = "{}";

	if($_POST) 
	{
		$q = $_POST["q"];
	
		if($q == "saatleriGetir")
		{
			$result = $db->prepare("SELECT * FROM saatler");
			if($result->execute())
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
				$jsonResult = array('sonuc' => "no", 'hata' => "Saatler getirilemedi.");
			}
		}			
		else if($q == "mekanSinifOgretmenGetir")
		{
			$getirilecekler = "";
			switch($_POST["gun"]){
				case "Pazartesi":
					$getirilecekler = "bas_saat_pzt,bit_saat_pzt,sinif_pzt,ogretmen_pzt";
					break;
				case "Salı":
					$getirilecekler = "bas_saat_sali,bit_saat_sali,sinif_sali,ogretmen_sali";
					break;
				case "Çarşamba":
					$getirilecekler = "bas_saat_crsb,bit_saat_crsb,sinif_crsb,ogretmen_crsb";
				break;
				case "Perşembe":
					$getirilecekler = "bas_saat_per,bit_saat_per,sinif_per,ogretmen_per";
				break;
				case "Cuma":
					$getirilecekler = "bas_saat_cuma,bit_saat_cuma,sinif_cuma,ogretmen_cuma";
				break;
				case "Cumartesi":
					$getirilecekler = "bas_saat_cts,bit_saat_cts,sinif_cts,ogretmen_cts";
				break;
				case "Pazar":
					$getirilecekler = "bas_saat_pzr,bit_saat_pzr,sinif_pzr,ogretmen_pzr";
				break;
			}

			$result = $db->prepare("SELECT oda,".$getirilecekler." FROM mekansinifogretmen");
			if($result->execute())
			{				
				$data = "";
				while($row = $result->fetchAll(PDO::FETCH_NUM)) //FETCH_ASSOC column adlı verir FETCH_NUM index mantığı ile verir.
				{
					$data = $row;
				}				
				if($data != "")
					$jsonResult = array('sonuc' => "yes", 'mesaj' => $data);
				else
					$jsonResult = array('sonuc' => "no", 'hata' => "[bos]");
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Mekan Sınıf Öğretmen getirilemedi.");
			}
		}
		else if($q == "nobetciOgrenciGetir")
		{
			$result = $db->prepare("SELECT * FROM nobetciogrenciler WHERE tarih=?");
			if($result->execute(array($_POST["tarih"])))
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
				$jsonResult = array('sonuc' => "no", 'hata' => "Nöbetçi Öğrenciler getirilemedi.");
			}
		}
		else if($q == "nobetciOgretmenGetir")
		{
			$getirilecek = "";
			switch($_POST["gun"]){
				case "Pazartesi":
					$getirilecek = "pazartesi";
					break;
				case "Salı":
					$getirilecek = "sali";
					break;
				case "Çarşamba":
					$getirilecek = "carsamba";
					break;
				case "Perşembe":
					$getirilecek = "persembe";
					break;
				case "Cuma":
					$getirilecek = "cuma";
					break;
				case "Cumartesi":
					$getirilecek = "cumartesi";
					break;
				case "Pazar":
					$getirilecek = "pazar";
					break;
			}
			$result = $db->prepare("SELECT ".$getirilecek." FROM nobetciogretmenler");
			if($result->execute())
			{				
				$data = "";
				while($row = $result->fetchAll(PDO::FETCH_NUM))
				{
					$data = $row;
				}				
				if($data != "")
					$jsonResult = array('sonuc' => "yes", 'mesaj' => $data);
				else
					$jsonResult = array('sonuc' => "no", 'hata' => "[bos]");
			}
			else{
				$jsonResult = array('sonuc' => "no", 'hata' => "Nöbetçi Öğretmenler getirilemedi.");
			}
		}
		else{
			$jsonResult = array('sonuc' => "no", 'hata' => "Parametre Hatası");
		}
	}
	else{
		$jsonResult = array('sonuc' => "no", 'hata' => "Parametre Hatası Post");
	}

	echo json_encode($jsonResult, JSON_UNESCAPED_UNICODE);
?>
