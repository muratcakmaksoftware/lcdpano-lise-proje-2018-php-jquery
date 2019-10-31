
<?php 
	header("Access-Control-Allow-Origin: *"); // post için gerekli izin
	header("Access-Control-Allow-Headers: *");
	header("Content-Type: application/json; charset=UTF-8");
	include "../../php/ayarlar.php";
	include_once('PHPExcel.php');
	include 'PHPExcel/IOFactory.php';

	include "../function.php";
	
	
	$jsonResult = "{}";

	if($_POST) 
	{
		$q = $_POST["q"];
		
		$yol = "";
		if(isset($_FILES['dosya']['tmp_name']))
		{
			$dosyaAdi = dosyaIsmiSifrele(basename($_FILES["dosya"]["name"]));
			$kayitDosyaYolu = "upload/".$dosyaAdi;
			if (move_uploaded_file($_FILES["dosya"]["tmp_name"], $kayitDosyaYolu)) 
			{
				$yol = $kayitDosyaYolu;
				$jsonResult = array('sonuc' => "yes", 'mesaj' => "Dosya Yüklendi");
			} else {
				$jsonResult = array('sonuc' => "no", 'hata' => "Dosya Yüklenmedi.");
			}
		}
		else
		{
			$jsonResult = array('sonuc' => "no", 'hata' => "Dosya Bulunamadı.");
		}
		
		if($jsonResult["sonuc"] == "yes"){
			
			$inputFileName = $yol;
			//  Read your Excel workbook
			try {
				$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
				$objReader = PHPExcel_IOFactory::createReader($inputFileType);
				$objPHPExcel = $objReader->load($inputFileName);
			} catch(Exception $e) {
				//die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
				$jsonResult = array('sonuc' => "no", 'hata' => 'Dosya Yükleme Hatası: "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
			}

			//  Get worksheet dimensions
			$sheet = $objPHPExcel->getSheet(0); 
			$highestRow = $sheet->getHighestRow(); 
			$highestColumn = $sheet->getHighestColumn();
			if($q == "nobetciOgrenciYukle")
			{	
				try {
					$result = $db->prepare("DELETE FROM nobetciogrenciler");
					if($result->execute())
					{				
						$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Nöbetçi Öğrenciler Başarıyla Silindi.');
					}
					else{
						$jsonResult = array('sonuc' => "no", 'hata' => "Nöbetçi Öğrenciler Silinemedi.");
					}
				}
				catch(Exception $e) {						
					$jsonResult = array('sonuc' => "no", 'hata' => 'Öğrencileri Silme Hatası."'.$e->getMessage());
				}	
				
			}
			else if($q == "mekanSinifOgretmenYukle"){
				try {
					$result = $db->prepare("DELETE FROM mekansinifogretmen");
					if($result->execute())
					{				
						$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Mekan Sınıf Öğretmen Başarıyla Silindi.');
					}
					else{
						$jsonResult = array('sonuc' => "no", 'hata' => "Mekan Sınıf Öğretmen Silinemedi.");
					}
				}
				catch(Exception $e) {						
					$jsonResult = array('sonuc' => "no", 'hata' => 'Mekan Sınıf Öğretmen Silme Hatası."'.$e->getMessage());
				}	
			}
			else if($q == "saatYukle"){
				try {
					$result = $db->prepare("DELETE FROM saatler");
					if($result->execute())
					{				
						$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Saatler Başarıyla Silindi.');
					}
					else{
						$jsonResult = array('sonuc' => "no", 'hata' => "Saatler Silinemedi.");
					}
				}
				catch(Exception $e) {						
					$jsonResult = array('sonuc' => "no", 'hata' => 'Saatler Silme Hatası."'.$e->getMessage());
				}	
			}
			else if($q == "nobetOgretmenYukle"){
				try {
					$result = $db->prepare("DELETE FROM nobetciogretmenler");
					if($result->execute())
					{				
						$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Nöbetçi Öğretmenler Silindi.');
					}
					else{
						$jsonResult = array('sonuc' => "no", 'hata' => "Nöbetçi Öğretmenler Silinemedi.");
					}
				}
				catch(Exception $e) {						
					$jsonResult = array('sonuc' => "no", 'hata' => 'Nöbetçi Öğretmenler Silme Hatası."'.$e->getMessage());
				}	
			}

			if($jsonResult["sonuc"] == "yes")
			{
				
				for ($row = 2; $row <= $highestRow; $row++){ // 2 satırdan başlanılmasının nedeni başlık sütunlarından
					$rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row,NULL,TRUE,FALSE);
					//var_dump($rowData);							
					
					if($q == "nobetciOgrenciYukle")
					{					
						try {
							$result = $db->prepare("INSERT INTO nobetciogrenciler SET tarih=?,sinif=?,numara=?,isim=?");
							if($result->execute(array($rowData[0][0],$rowData[0][1], $rowData[0][2],$rowData[0][3])))
							{				
								$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Nöbetçi Öğrenciler Başarıyla Eklendi.');
							}
							else{
								$jsonResult = array('sonuc' => "no", 'hata' => "Nöbetçi Öğrenci Eklenirken Hata. Lütfen Excel Bilgileri Doğruluğunu Kontrol Edin.");
								break;//İşlemi Sonlandır.
							}
						}
						catch(Exception $e) {						
							$jsonResult = array('sonuc' => "no", 'hata' => 'Öğrenci Ekleme Hatası: "'.$e->getMessage());
							break;
						}
						
					}
					else if($q == "mekanSinifOgretmenYukle"){
						try {
							$result = $db->prepare("INSERT INTO mekansinifogretmen SET oda=?,
							bas_saat_pzt=?,bit_saat_pzt=?,sinif_pzt=?,ogretmen_pzt=?,
							bas_saat_sali=?,bit_saat_sali=?,sinif_sali=?,ogretmen_sali=?,
							bas_saat_crsb=?,bit_saat_crsb=?,sinif_crsb=?,ogretmen_crsb=?,
							bas_saat_per=?,bit_saat_per=?,sinif_per=?,ogretmen_per=?,
							bas_saat_cuma=?,bit_saat_cuma=?,sinif_cuma=?,ogretmen_cuma=?,
							bas_saat_cts=?,bit_saat_cts=?,sinif_cts=?,ogretmen_cts=?,
							bas_saat_pzr=?,bit_saat_pzr=?,sinif_pzr=?,ogretmen_pzr=?");
							if($result->execute(array($rowData[0][0],
							$rowData[0][1], $rowData[0][2],$rowData[0][3],$rowData[0][4],
							$rowData[0][5], $rowData[0][6],$rowData[0][7],$rowData[0][8],
							$rowData[0][9], $rowData[0][10],$rowData[0][11],$rowData[0][12],
							$rowData[0][13], $rowData[0][14],$rowData[0][15],$rowData[0][16],
							$rowData[0][17], $rowData[0][18],$rowData[0][19],$rowData[0][20],
							$rowData[0][21], $rowData[0][22],$rowData[0][23],$rowData[0][24],
							$rowData[0][25], $rowData[0][26],$rowData[0][27],$rowData[0][28])))
							{				
								$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Mekan Eklendi.');
							}
							else{
								$jsonResult = array('sonuc' => "no", 'hata' => "Mekan Eklenirken Hata. Lütfen Excel Bilgileri Doğruluğunu Kontrol Edin.");
								break;//İşlemi Sonlandır.
							}
						}
						catch(Exception $e) {						
							$jsonResult = array('sonuc' => "no", 'hata' => 'Mekan Ekleme Hatası: "'.$e->getMessage());
							break;
						}
					}
					else if($q == "saatYukle")
					{					
						try {
							$result = $db->prepare("INSERT INTO saatler SET bas_saat=?,bit_saat=?,mesaj=?");
							if($result->execute(array($rowData[0][0],$rowData[0][1], $rowData[0][2])))
							{				
								$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Saatler Başarıyla Eklendi.');
							}
							else{
								$jsonResult = array('sonuc' => "no", 'hata' => "Saatler Eklenirken Hata. Lütfen Excel Bilgileri Doğruluğunu Kontrol Edin.");
								break;//İşlemi Sonlandır.
							}
						}
						catch(Exception $e) {						
							$jsonResult = array('sonuc' => "no", 'hata' => 'Saat Ekleme Hatası: "'.$e->getMessage());
							break;
						}
						
					}
					else if($q == "nobetOgretmenYukle")
					{					
						try {
							$result = $db->prepare("INSERT INTO nobetciogretmenler SET pazartesi=?,sali=?,carsamba=?,persembe=?,cuma=?,cumartesi=?,pazar=?");
							if($result->execute(array($rowData[0][0],$rowData[0][1], $rowData[0][2],$rowData[0][3], $rowData[0][4],$rowData[0][5], $rowData[0][6])))
							{				
								$jsonResult = array('sonuc' => "yes", 'mesaj' => 'Nöbetçi Öğretmenler Eklendi.');
							}
							else{
								$jsonResult = array('sonuc' => "no", 'hata' => "Nöbetçi Öğretmenler Hata. Lütfen Excel Bilgileri Doğruluğunu Kontrol Edin.");
								break;//İşlemi Sonlandır.
							}
						}
						catch(Exception $e) {						
							$jsonResult = array('sonuc' => "no", 'hata' => 'Nöbetçi Öğretmenler Hatası: "'.$e->getMessage());
							break;
						}
						
					}
					
					
				}
			}

			//Yüklenen dosya siliniyor.
			unlink($yol);
		}
		
		
	}
	else{
		$jsonResult = array('sonuc' => "no", 'hata' => "Parametre Hatası");
	}
	echo json_encode($jsonResult, JSON_UNESCAPED_UNICODE);
?>
