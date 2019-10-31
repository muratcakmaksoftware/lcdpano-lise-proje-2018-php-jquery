<?php
	
	function dosyaIsmiSifrele($isim){
		$lastindex = strripos($isim, "."); // sondaki . indeksi alınıyor.
		$exp = substr($isim, $lastindex, strlen($isim) -1); //sondakini kesmemiz için başlangıcı lastindex noktadan itibaren strlen ile ismin sonundaki indeks bilgisini alıp kesiyoruz.  
		//Exp dosya uzantımız belli.		
		//Şifreleme kısmı.		
		$isim .= date("Y-m-d H:i:s");
		$isim .= rand(1,5000);
		
		$alf = "";
		// dizi sayısı kadar karışık harf seçip kelime yaratmak için.
		$al = array("b","c","d","e","f","g","m","u","r","a","t");
		foreach($al as $ke){ 
			$d = $al[rand(0,count($al) - 1)];
			$alf.= $d;
		}
		
		$isim .= $alf;
		return md5($isim).$exp;
	}
?>


