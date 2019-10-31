
function post(url,form_data,kontrol)
{
	$.ajax({
		url : url,
		type: 'POST',
		crossDomain: true,
		dataType: 'text',
		data: form_data,
		cache : false,
		contentType: false,
		processData: false
	}).done(function(response) {
		var posted_json = $.parseJSON(response);		
		switch(kontrol)
		{
			// Yayınla
			case "panoGuncelle":
				panoGuncellemeGonderPosted(posted_json);
				break;

			// Login Request
			case "login": 
				loginPosted(posted_json);
				break;
			case "logincheck": 
				checkLoginUpdatePosted(posted_json);
				break;

			// Pano Request
			case "panoBilgileriniGetir":
				indexBindingPosted(posted_json);				
				break;
			case "panoKaydet":
				panoKaydetPosted(posted_json);			
				break;
			case "panoKulBilgileriniKaydet":
				panoKulBilgileriniKaydetPosted(posted_json);
				break;

			//Tema 1 Ayarlar Yazılar
			case "yaziEkle":
				yaziEklePosted(posted_json);
				break;

			case "yazilariGetir":				
				yazilariGetirPosted(posted_json);
				break;
			case "yaziSil":
				yaziSilPosted(posted_json);
				break;
			case "slaytEkle":
				slaytEklePosted(posted_json);
				break;

			case "slaytlariGetir":
				slaytlariGetirPosted(posted_json);
				break;

			case "slaytSil":
				slaytSilPosted(posted_json);
				break;
			case "slaytGuncelle":
				slaytGuncellePosted(posted_json);
				break;
			case "nobetciOgrenciYukle":
				nobetciOgrenciYuklePosted(posted_json);
				break;
			case "mekanSinifOgretmenYukle":
				mekanSinifOgretmenYuklePosted(posted_json);
				break;
			
			case "saatYukle":
				saatYuklePosted(posted_json);
				break;

			case "nobetOgretmenYukle":
				nobetOgretmenYuklePosted(posted_json);
				break;
			
		}
	});
}


function login(){	
	if($( "#kadi" ).val() != "" && $( "#pw" ).val())
	{
		var form_data = new FormData();	
		form_data.append('kadi',$( "#kadi" ).val());
		form_data.append('pw', $( "#pw" ).val());	
		post(getUrl('login'), form_data, "login");
	}
	else
	{
		toastEkle("Giriş Yap","Kullanıcı Adı Ve Şifreyi Boş Geçemezsinz.","dikkat");
	}

	
}

function loginPosted(posted_json){
	if(posted_json.sonuc == "yes") // yol 1 posted_json['sonuc'] / posted_json.sonuc
	{
		// logged in
		var data = posted_json.mesaj;		
		sessionStorage.setItem("kul_id", data.kul_id);
		sessionStorage.setItem("kadi", data.kadi);
		sessionStorage.setItem("pw", data.pw);
		sessionStorage.setItem("adi", data.adi);
		window.location.href = "index.php";
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
			toastEkle("Giriş Yap","Kullanıcı Adı Veya Şifre Yanlış!", "dikkat");
		}
		else{ // gerçek hata
			toastEkle("Giriş Yap","Hata:"+posted_json.hata, "hata");
		}
	}
}

function checkLoginUpdate(){
	var form_data = new FormData();	
	form_data.append('kadi',sessionStorage.getItem("kadi"));
	form_data.append('pw', sessionStorage.getItem("pw"));	
	post(getUrl('login'), form_data, "logincheck");
}

function checkLoginUpdatePosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{
		var data = posted_json.mesaj;		
		sessionStorage.setItem("kul_id", data.kul_id);
		sessionStorage.setItem("kadi", data.kadi);
		sessionStorage.setItem("pw", data.pw);
		sessionStorage.setItem("adi", data.adi);
		//Bilgiler güncellendi.
		//console.log("session updated");
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
			window.location.href = "login.php";
		}
		else{ // gerçek hata
			window.location.href = "login.php";
		}
	}
}


function cikisYap(){
	sessionStorage.clear();
	window.location.href = "login.php";
}


function router(url, sayfa)
{
	$.ajax({
		url : url,
		type: 'GET',
		dataType: 'text',
		cache : false,
		contentType: false,
		processData: false
	}).done(function(response) {
		$( "#sagkapsaicerik" ).html(response);

		if(sayfa == "Ana Sayfa")
		{
			indexBinding();
		}
		else if (sayfa == "Tema Ayarları"){
			temaAyarlariBinding();
		}
	});
}



function panoKaydet(){
	var form_data = new FormData();	
	form_data.append('q',"panoKaydet");
	form_data.append('pano_adi',$( "#panobaslik" ).val());
	form_data.append('tema',$( "#temasecim" ).val());
	post(getUrl('pano'),form_data,"panoKaydet");
}

function panoKaydetPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		secilenTema = $( "#temasecim" ).val(); //Tema bilgisi güncellendiği için tema ayarları için şu anki seçilen tema bilgisi veriliyor.
		toastEkle("Genel Ayarlar",posted_json.mesaj,"bilgi");
	}
	else
	{
		toastEkle("Genel Ayarlar","Hata:"+posted_json.hata,"hata");
	}
}

function kulBilgileriKaydet(){

	if($( "#kadi" ).val() != "" && $( "#eskisifre" ).val() != "" && $( "#yenisifre" ).val() != "" && $( "#yenisifretekrari" ).val() != "")
	{
		if($( "#yenisifre" ).val() ==  $( "#yenisifretekrari" ).val() )
		{
			var form_data = new FormData();	
			form_data.append('q',"panoKulBilgileriniKaydet");
			form_data.append('kul_id',sessionStorage.getItem("kul_id"));
			form_data.append('kadi',$( "#kadi" ).val());
			form_data.append('pweski',$( "#eskisifre" ).val());
			form_data.append('pwyeni',$( "#yenisifre" ).val());	
			post(getUrl('pano'),form_data,"panoKulBilgileriniKaydet");
		}
		else
		{
			toastEkle("Kullanıcı Bilgileri","Yeni Şifreler Uyuşmuyor.","dikkat");
		}
		
	}
	else
	{
		toastEkle("Kullanıcı Bilgileri","Bilgileri Boş Geçemezsiniz.","dikkat");
	}
	
}

function panoKulBilgileriniKaydetPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Kullanıcı Bilgileri",posted_json.mesaj,"bilgi");
		//Yeni Şifreyi ve kullanıcı adını sessionda güncelleme
		sessionStorage.setItem("kadi", $( "#kadi" ).val());
		sessionStorage.setItem("pw", $( "#yenisifre" ).val());
		$( "#eskisifre" ).val('');		
		$( "#yenisifre" ).val('');
		$( "#yenisifretekrari" ).val('');
	}
	else
	{
		if(posted_json.hata == "Şu anki şifreniz doğru değil!")
		{
			toastEkle("Kullanıcı Bilgileri",posted_json.hata,"dikkat");
		}
		else{
			toastEkle("Kullanıcı Bilgileri","Hata:"+posted_json.hata,"hata");
		}
	}
}

function panoYayinla(){
	panoGuncellemeGonder();
}

function panoGuncellemeGonder(){
	var form_data = new FormData();	
	form_data.append('q',"panoGuncelle");	
	post(getUrl('pano'),form_data,"panoGuncelle");
}

function panoGuncellemeGonderPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Pano Yayınla",posted_json.mesaj,"bilgi");
		//Güncelleme başarılı
	}
	else
	{
		toastEkle("Pano Güncelleme","Hata:"+posted_json.hata,"hata");
	}
}



function yaziEkle(){
	if($( "#yaziekle" ).val() != "")
	{
		var form_data = new FormData();	
		form_data.append('q',"yaziEkle");	
		form_data.append('tema',secilenTema);	
		form_data.append('yazi',$( "#yaziekle" ).val());		
		post(getUrl('yazilar'),form_data,"yaziEkle");
	}
	else
	{
		toastEkle("Yazı Ekle","Yazı Boş Geçilemez.","dikkat");
	}
	
}


function yaziEklePosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Yazı Ekle",posted_json.mesaj,"bilgi");
		$( "#yaziekle" ).val(''); // yazı eklendiği için texti sıfırlıyoruz.
		yazilariGetir();//yazıları güncelle.
	}
	else
	{
		toastEkle("Yazı Ekle","Hata:"+posted_json.hata,"hata");
	}
}

function yaziSil(yazi_id){
	if(yazi_id != null && yazi_id != "")
	{
		var form_data = new FormData();	
		form_data.append('q',"yaziSil");	
		form_data.append('tema',secilenTema);	
		form_data.append('yazi_id',yazi_id);		
		post(getUrl('yazilar'),form_data,"yaziSil");
	}
	else
	{
		toastEkle("Yazı Sil","Yazı id bulunamadı.","dikkat");
	}
}


function yaziSilPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Yazı Sil",posted_json.mesaj,"bilgi");
		yazilariGetir(); // Yazıları Güncelle.
	}
	else
	{
		toastEkle("Yazı Sil","Hata:"+posted_json.hata,"hata");
	}
}

var secilenTip = "";
function dosyaSecildi(){
	secilenTip = "";		
	var fileinput = document.getElementById('secilenDosya'); 	
	secilenDosya = fileinput.files.item(0);
	var ftype = undefined;
	if(secilenDosya  != null)
	{
		$( "#dosyaAdi").html(secilenDosya.name);
		ftype = this.secilenDosya.type;
	}
	
	//console.log(ftype);
    if(ftype != undefined)
    {					
		if(ftype == "image/jpg" || ftype == "image/png" || ftype == "image/jpeg")
      	{
			secilenTip = "resim";
		}		

		if(ftype == "video/mp4")
      	{
			secilenTip = "video";
	  	}
		
		if(secilenTip == "")
		{
			toastEkle("Dosya Seçim","Sadece jpg,png,mp4 seçilebilir.","dikkat");
			$( "#dosyaAdi").html('Seçilen Dosya');
			$("#secilenDosya").val('');	
		}

	}
	else{
		$( "#dosyaAdi").html('Seçilen Dosya');	
		$("#secilenDosya").val('');
		secilenTip = "";
	}
}

function slaytEkle(){
	if($( "#tvurl").val() != "" || secilenTip != "")
	{
		if($( "#beklemesuresi").val() != "")
		{
			var beklemeSuresi = parseInt($( "#beklemesuresi").val());
			if(beklemeSuresi < 0)
			{
				beklemeSuresi *=-1;//negatifse pozitif yap.
			}

			var form_data = new FormData();	
			form_data.append('q',"slaytEkle");	
			form_data.append('tema', secilenTema);
			form_data.append('tip', secilenTip);	
			//console.log("Go:"+secilenTip);
			if(secilenTip == "resim" || secilenTip == "video")
			{
				form_data.append('dosya', $('#secilenDosya')[0].files[0]);
			}
			else{
				form_data.append('url', $('#tvurl').val());
			}			
			form_data.append('beklemesuresi', beklemeSuresi);	
			post(getUrl('slaytlar'),form_data,"slaytEkle");

		}
		else{
			toastEkle("Slayt Ekle","Bekleme Süresi Boş Geçilemez.","dikkat");
		}
	}
	else{
		toastEkle("Slayt Ekle","Lütfen Dosya Seçin veya url girin.","dikkat");
	}
}

function slaytEklePosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Slayt Ekle",posted_json.mesaj,"bilgi");
		//Slaytları getir yapılcak.
		secilenTip = "";
		$('#tvurl').val('');
		$("#dosyaAdi").html('Seçilen Dosya');	
		$("#secilenDosya").val('');
		$('#dosyakontrol').show();

		//Slayt Eklendiyse Bilgileri Güncelle.
		slaytlariGetir();
	}
	else
	{		
		toastEkle("Slayt Ekle","Hata:"+posted_json.hata,"hata");
	}
}

function slaytSil(slayt_id){
	if(slayt_id != null && slayt_id != "")
	{
		var form_data = new FormData();	
		form_data.append('q',"slaytSil");	
		form_data.append('tema',secilenTema);	
		form_data.append('slayt_id',slayt_id);	
		post(getUrl('slaytlar'),form_data,"slaytSil");
	}
	else
	{
		toastEkle("Slayt Sil","Slayt id bulunamadı.","dikkat");
	}
}

function slaytSilPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Slayt Sil",posted_json.mesaj,"bilgi");
		slaytlariGetir(); // Slaytları Güncelle.
	}
	else
	{
		toastEkle("Slayt Sil","Hata:"+posted_json.hata,"hata");
	}
}

function slaytGuncelle(slayt_id, i){
	if(slayt_id != null && slayt_id != "")
	{
		if($('#bekSuresi'+i).val() != "")
		{
			var form_data = new FormData();	
			form_data.append('q',"slaytGuncelle");	
			form_data.append('tema',secilenTema);	
			form_data.append('slayt_id',slayt_id);
			form_data.append('beklemesuresi',$('#bekSuresi'+i).val());	
			post(getUrl('slaytlar'),form_data,"slaytGuncelle");
		}
		else{
			toastEkle("Slayt Güncelle","Bekleme Süresi Boş Geçilemez.","dikkat");
		}
		
	}
	else{
		toastEkle("Slayt Güncelle","Slayt id bulunamadı.","dikkat");
	}
}


function slaytGuncellePosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Slayt Güncelle",posted_json.mesaj,"bilgi");		
	}
	else
	{
		toastEkle("Slayt Güncelle","Hata:"+posted_json.hata,"hata");
	}
}
function tvurlChange(){	
	if($( "#tvurl").val().length > 0){		
		$('#dosyakontrol').hide();	
		//önceden seçilmiş dosya varsa kaldır.            
		$("#secilenDosya").val('');
		$( "#dosyaAdi").html('Seçilen Dosya');	
		secilenTip = "tv";
		
	}
	else{
		$('#dosyakontrol').show();
		secilenTip = "";		
	}
}

function excelKontrol(par){
	secildiMi = "";		
	var fileinput;
	if(par == "nobetciogrenci")
	{
		fileinput = document.getElementById('secNobetciOgrenciFile'); 	
	}
	else if(par == "mekansinifogretmen"){
		fileinput = document.getElementById('secMekanSinifOgretmenFile'); 	
	}
	else if(par == "saat"){
		fileinput = document.getElementById('secSaatFile'); 	
	}
	else if(par == "nobetogretmen"){				
		fileinput = document.getElementById('secNobetOgretmenFile'); 	
	}
	
	secilenDosya = fileinput.files.item(0);

	var ftype=undefined;
	if(secilenDosya != null)
	{
		if(par == "nobetciogrenci")
		{
			$( "#secNobetciSecilenDosya").html(secilenDosya.name);
		}
		else if(par == "mekansinifogretmen"){		
			$( "#secMekanSinifOgretmenSecilenDosya").html(secilenDosya.name);
		}
		else if(par == "saat"){		
			$( "#secSaatSecilenFile").html(secilenDosya.name);
		}
		else if(par == "nobetogretmen"){		
			$( "#secNobetOgretmenSecilenFile").html(secilenDosya.name);
		}
		ftype = this.secilenDosya.type;
	}

	//console.log(ftype);
    if(ftype != undefined)
    {					
		if(ftype == "application/vnd.ms-excel" || ftype == "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
      	{
			secildiMi = "excel";
		}		

		if(secildiMi == "")
		{
			if(par == "nobetciogrenci")
			{
				toastEkle("Nöbetçi Öğrenci","Sadece xls,xlsx seçilebilir.","dikkat");
				$( "#secNobetciSecilenDosya").html('Seçilen Dosya');
				$("#secNobetciOgrenciFile").val('');
			}
			else if(par == "mekansinifogretmen"){
				toastEkle("Mekan Sınıf Öğretmen","Sadece xls,xlsx seçilebilir.","dikkat");
				$( "#secMekanSinifOgretmenSecilenDosya").html('Seçilen Dosya');
				$("#secMekanSinifOgretmenFile").val('');
			}
			else if(par == "saat"){		
				toastEkle("Saatler","Sadece xls,xlsx seçilebilir.","dikkat");
				$( "#secSaatSecilenFile").html('Seçilen Dosya');
				$("#secSaatFile").val('');
			}
			else if(par == "nobetogretmen"){		
				toastEkle("Nöbetçi Öğretmen","Sadece xls,xlsx seçilebilir.","dikkat");
				$( "#secNobetOgretmenSecilenFile").html('Seçilen Dosya');
				$("#secNobetOgretmenFile").val('');
			}
				
		}

	}
	else{
		if(par == "nobetciogrenci")
		{
			$("#secNobetciSecilenDosya").html('Seçilen Dosya');	
			$("#secNobetciOgrenciFile").val('');
		}
		else if (par == "mekansinifogretmen"){
			$( "#secMekanSinifOgretmenSecilenDosya").html('Seçilen Dosya');
			$("#secMekanSinifOgretmenFile").val('');
		}
		else if (par == "saat"){
			$( "#secSaatSecilenFile").html('Seçilen Dosya');
			$("#secSaatFile").val('');
		}
		else if (par == "nobetogretmen"){
			$( "#secNobetOgretmenSecilenFile").html('Seçilen Dosya');
			$("#secNobetOgretmenFile").val('');
		}
		
	}
}


function nobetciOgrenciYukle(){
	if($("#secNobetciOgrenciFile").val() != "")
	{
		var form_data = new FormData();	
		form_data.append('q',"nobetciOgrenciYukle");
		form_data.append('dosya',$('#secNobetciOgrenciFile')[0].files[0]);		
		post(getUrl('index1excel'),form_data,"nobetciOgrenciYukle");
	}
	else
	{
		toastEkle("Nöbetçi Öğrenci","Lütfen Excel Seçiniz.","dikkat");
		
	}
}

function nobetciOgrenciYuklePosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Nöbetçi Öğrenci",posted_json.mesaj,"bilgi");	
		$( "#secNobetciSecilenDosya").html('Seçilen Dosya');
		$("#secNobetciOgrenciFile").val('');	
	}
	else
	{
		toastEkle("Nöbetçi Öğrenci","Hata:"+posted_json.hata,"hata");
	}
}


function mekanSinifOgretmenYukle(){
	if($("#secMekanSinifOgretmenFile").val() != "")
	{
		var form_data = new FormData();	
		form_data.append('q',"mekanSinifOgretmenYukle");
		form_data.append('dosya',$('#secMekanSinifOgretmenFile')[0].files[0]);		
		post(getUrl('index1excel'),form_data,"mekanSinifOgretmenYukle");
	}
	else
	{
		toastEkle("Mekan Sınıf Öğretmen","Lütfen Excel Seçiniz.","dikkat");
	}
}

function mekanSinifOgretmenYuklePosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Mekan Sınıf Öğretmen",posted_json.mesaj,"bilgi");		
		$( "#secMekanSinifOgretmenSecilenDosya").html('Seçilen Dosya');
		$("#secMekanSinifOgretmenFile").val('');
	}
	else
	{
		toastEkle("Mekan Sınıf Öğretmen","Hata:"+posted_json.hata,"hata");
	}
}

function saatYukle(){
	if($("#secSaatFile").val() != "")
	{
		var form_data = new FormData();	
		form_data.append('q',"saatYukle");
		form_data.append('dosya',$('#secSaatFile')[0].files[0]);		
		post(getUrl('index1excel'),form_data,"saatYukle");
	}
	else
	{
		toastEkle("Saatler","Lütfen Excel Seçiniz.","dikkat");
	}
}

function saatYuklePosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Saatler",posted_json.mesaj,"bilgi");		
		$( "#secSaatSecilenFile").html('Seçilen Dosya');
		$("#secSaatFile").val('');
	}
	else
	{
		toastEkle("Saatler","Hata:"+posted_json.hata,"hata");
	}
}


function nobetOgretmenYukle(){
	if($("#secNobetOgretmenFile").val() != "")
	{
		var form_data = new FormData();	
		form_data.append('q',"nobetOgretmenYukle");
		form_data.append('dosya',$('#secNobetOgretmenFile')[0].files[0]);		
		post(getUrl('index1excel'),form_data,"nobetOgretmenYukle");
	}
	else
	{
		toastEkle("Nöbetçi Öğretmen","Lütfen Excel Seçiniz.","dikkat");
	}
}

function nobetOgretmenYuklePosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{	
		toastEkle("Nöbetçi Öğretmen",posted_json.mesaj,"bilgi");		
		$( "#secNobetOgretmenSecilenFile").html('Seçilen Dosya');
		$("#secNobetOgretmenFile").val('');
	}
	else
	{
		toastEkle("Nöbetçi Öğretmen","Hata:"+posted_json.hata,"hata");
	}
}