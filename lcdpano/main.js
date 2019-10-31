
/// ########## Genel Fonksiyonlar ##########
function router(url, tema, data) // Temayı yükler.
{
	$.ajax({
		url : url,
		type: 'GET',
		dataType: 'text',
		cache : false,
		contentType: false,
		processData: false
	}).done(function(response) {		
		$( "#kapsaicerik" ).html(response);		
		toastEkle("Pano", tema+" Başarıyla Yüklendi","bilgi");
		// Genel Binding
		$('#panobaslik').html(data.pano_adi); 
		if(tema == "Tema 1")
		{			
			index1Binding();// bu tema ile alakalı bindingler yapılıyor.
		}
		else if(tema == "Tema 2")
		{			
			index2Binding();
		}
		
	});
}

function post(url,form_data,kontrol)
{
	$.ajax({
		url : url,
		type: 'POST',
		dataType: 'text',
		data: form_data,
		cache : false,
		contentType: false,
		processData: false
	}).done(function(response) {
		var posted_json = $.parseJSON(response);		
		switch(kontrol)
		{
			case "panoBilgileriniGetir":
				panoBilgileriniGetirPosted(posted_json);
				break;
			
			case "panoGuncellendi":
				panoGuncellendiPosted(posted_json);
				break;
			case "yazilariGetir":
				yazilariGetirPosted(posted_json);
				break;
			case "slaytlariGetir":
				slaytlariGetirPosted(posted_json);
				break;
			case "saatleriGetir":
				saatleriGetirPosted(posted_json);
				break;
			case "mekanSinifOgretmenGetir":
				mekanSinifOgretmenGetirPosted(posted_json);
				break;
			case "nobetciOgrenciGetir":
				nobetciOgrenciGetirPosted(posted_json);
				break;
			case "nobetciOgretmenGetir":
				nobetciOgretmenGetirPosted(posted_json);
				break;
		}
	});
}

// #####  Genel Ayarlar  #####
var suankiZaman = "";
var dt = new Date();
var gunlerIsimleri = Array("Pazar","Pazartesi","Salı", "Çarşamba", "Perşembe","Cuma","Cumartesi");
var suankiGun = "";
setInterval(function(){
	dt = new Date();
	suankiZaman = dt.toLocaleDateString() +" "+ dt.toLocaleTimeString();	
	suankiGun = gunlerIsimleri[dt.getDay()];
	
	$( "#suankiZaman" ).html( suankiZaman );
	$( "#suankiGun" ).html( suankiGun );
}, 800);



function panoBilgileriniGetir(){
	var form_data = new FormData();		
	form_data.append('q', "panoBilgileriniGetir");	
	post(getUrl('pano'),form_data,"panoBilgileriniGetir");
}

var ilkYukleme = true;
aktifTema = "";
function panoBilgileriniGetirPosted(posted_json){
	//Güncelleme bilgisi alındı.
	
	if(posted_json.sonuc == "yes") 
	{		
		var data = posted_json.mesaj;		

		guncellemeKontrol = data.guncelleme;		
		if(guncellemeKontrol == 1) // Güncelleme Var
		{			
			panoGuncellendi(); //veritabanı güncelleme yapılıyor ve verisine = 0 atanıyor.
			if(aktifTema != data.tema) // Tema değişmiş.
			{
				temaYukle(data);
			}
			else
			{
				//Aynı temada güncelleme

				// Güncelleme genel bind.
				$('#panobaslik').html(data.pano_adi); 

				// Güncelleme mevcut
				if(data.tema == "Tema 1")
				{				
					index1Binding();				
				}
				else if(data.tema == "Tema 2")
				{
					index2Binding();
				}
				toastEkle("Pano","Tema Güncellendi.","bilgi");
			}
		}
		else{
			guncellemeKontrol = 0; //eğer guncelleme yoksa kontrol etmeye devam etsin.
		}

		if(ilkYukleme)
		{
			ilkYukleme = false;
			temaYukle(data);
			
		}

		
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
			toastEkle("Pano Bilgi","Bilgiler Boş","hata");
		}
		else{
			toastEkle("Pano Bilgi","Hata:"+posted_json.hata,"hata");
		}
	}

	
}

function temaYukle(data){
	aktifTema = data.tema; //Tema yüklenmeden önce tema adı veriliyor. ona göre tema yüklenecek.
	if(data.tema == "Tema 1")
	{
		router("temalar/index.php", "Tema 1", data);			
	}
	else if(data.tema == "Tema 2")
	{
		router("temalar/index2.php", "Tema 2", data);
	}
	
}

/// ########  Pano güncelleme kontrolü ########

function panoGuncellendi(){	// guncellemeyi = 0 yapar.
	var form_data = new FormData();		
	form_data.append('q', "panoGuncellendi");	
	post(getUrl('pano'),form_data,"panoGuncellendi");
}

function panoGuncellendiPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{
		console.log("Güncelleme sıfırlama başarılı.");
		//var data = posted_json.mesaj;	
		//Pano güncellemesi tamamlandı.
		guncellemeKontrol = 0;
		//console.log("pano güncellendi.");
	}
	else
	{
		guncellemeKontrol = 0;//hata olursa tekrar güncellenmesi için sıfıra alıyoruz.
		toastEkle("Pano Bilgi","Pano Güncelleme Hatası","hata");
	}
}

var guncellemeKontrol = 0; // 0 güncelleme yok 1 güncelleme var. // 3 güncelleme kontrolü bekliyor

function gKontrol() {
	if(guncellemeKontrol == 0)
	{
		guncellemeKontrol = 3; // kontrolün tamamlanması için durumu 3 çekiyoruz birden fazla kontrol olmasın diye.
		var form_data = new FormData();		
		form_data.append('q', "panoBilgileriniGetir");	
		post(getUrl('pano'),form_data,"panoBilgileriniGetir");

	}
	
}

// ########## Başlangıç Binding ##########
panoGuncellendi(); // başlangıçta pano bilgilerininde guncellemeyi = 0 yapıyoruz çünkü zaten ilk bilgi çekilişinde güncel bilgiler gelmiş olacak.

setInterval(function(){
	setInterval(gKontrol(),500);
}, 3000); // 3 saniyede bir güncelleme var mı kontrolü.

function index1Binding(){ 
	yazilariGetir();
	slaytlariGetir();
	saatleriGetir();
	mekanSinifOgretmenGetir();
	nobetciOgrenciGetir();
	nobetciOgretmenGetir();
}

function index2Binding(){ 
	yazilariGetir();
	slaytlariGetir();
}