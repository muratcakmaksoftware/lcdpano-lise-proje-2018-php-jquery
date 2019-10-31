function yazilariGetir(){
	var form_data = new FormData();		
    form_data.append('q', "yazilariGetir");	
    form_data.append('tema', aktifTema);	
	post(getUrl('yazilar'),form_data,"yazilariGetir");    
	
}


var yazilar = null;
var kayanYaziTim = null;
function yazilariGetirPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{
		yazilar = posted_json.mesaj;			
		yazindex = 0;		
		kayanYaziTim = setInterval(kayanYaziTimer, 1000);             
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
			//yazılar boş.
			yazilar = null;		
		}
		else{
			yazilar = null;
			toastEkle("Yazılar","Hata:"+posted_json.hata,"hata");
		}
	}
}
var yaziGenisligi = 0;
var ekranGenisligi;
var yazindex = 0;
var yeniYaziGetir = true;
var yaziyiKaydirTim = null;
var yazininBitecegiKonum = 0;
function kayanYaziTimer() {
	if(yazilar != null){
		if(yeniYaziGetir)
		{
			yeniYaziGetir = false;
			if(yazilar.length == yazindex){ //yazı tekrarlamanması için.
				yazindex = 0;
			}
			//Yazı konumlanıyor.
			$( "#kayanYazi" ).html(yazilar[yazindex].yazi);	//Yazı aktarılıyor	
			yaziGenisligi = $( "#kayanYazi" ).outerWidth(); // yazının genişliği alınıyor
			ekranGenisligi = $(window).width(); // ekranın genişliğin alınıyor.
			//console.log("Ekran Genişliği:"+ekranGenisligi);
			//console.log("Yazı Genişliği:"+yaziGenisligi);
			$("#kayanYazi").css('left', ekranGenisligi); // ekranın dışına taşınıyor.
			yazininBitecegiKonum = -(yaziGenisligi + 5); // yazının kaybolacağı konum belirleniyor
			//console.log("Yazının Biteceği konum:"+yazininBitecegiKonum);
			yaziyiKaydirTim = setInterval(yaziyiKaydirTimer, 20); //yazı kaydırılmaya başlatılıyor // 100 yazının kaydırma hızı.			
		}
	}
	else
	{
		//clearInterval(kayanYaziTim);
	}
		
}

function yaziyiKaydirTimer(){			
	if($("#kayanYazi").position().left <= yazininBitecegiKonum)
	{
		yeniYaziGetir = true;
		yazindex++; // Yeni yazı gelsin.
		clearInterval(yaziyiKaydirTim);
	}
	else{
		$("#kayanYazi").css('left', ($("#kayanYazi").position().left -7))
	}
}


function slaytlariGetir(){
	var form_data = new FormData();		
    form_data.append('q', "slaytlariGetir");	
    form_data.append('tema', aktifTema);	
    post(getUrl('slaytlar'),form_data,"slaytlariGetir");    
}

var slaytlar = null;
var slaytCount = null;
var slaytIndex = 0;
var slaytTimer=null;
function slaytlariGetirPosted(posted_json){
	//console.log(posted_json);
	if(posted_json.sonuc == "yes") 
	{
		slaytlar = posted_json.mesaj;		 		
		slaytIndex = 0;		
		//İlk Yayını Başlatma.
		clearTimeout(slaytTimer); // önceki yayınları kaldırma.
		slaytTimer = setTimeout(slaytYayin, 10);		
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
			clearTimeout(slaytTimer);
			slaytlar = null;
            $( "#ortaicerik" ).html('');			
		}
		else{
			clearTimeout(slaytTimer);
			slaytlar = null;
            $( "#ortaicerik" ).html('');
			toastEkle("Slaytlar","Hata:"+posted_json.hata,"hata");
		}
	}
}

function slaytYayin(){

	if(slaytlar != null)
	{
		if(slaytlar.length == slaytIndex){ 
			slaytIndex = 0;
		}

		switch(slaytlar[slaytIndex].tip){
			case "tv":
				$('#ortaicerik').html("<iframe src='"+slaytlar[slaytIndex].yol+"' frameborder='0' width='100%' height='100%' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>");
				break;
			case "resim":
				$('#ortaicerik').html("<img src='"+slaytlar[slaytIndex].yol+"' width='100%' height='100%' />");
				break;
			case "video": // "<iframe src='"+slaytlar[slaytIndex].yol+"' frameborder='0' width='100%' height='100%' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>"
				$('#ortaicerik').html("<video width='100%' height='100%' controls autoplay loop><source src='"+slaytlar[slaytIndex].yol+"' type='video/mp4'></video>");				
				break;
		}
		//console.log( slaytIndex+" - " + (slaytlar[slaytIndex].beklemesuresi * 1000));		
		slaytTimer = setTimeout(slaytYayin, (slaytlar[slaytIndex].beklemesuresi * 1000));
		slaytIndex++;
	}
}


function saatleriGetir(){
	var form_data = new FormData();		
    form_data.append('q', "saatleriGetir");	
	post(getUrl('index1'),form_data,"saatleriGetir");   
}


var saatler = null;
var saatTimer = null;
function saatleriGetirPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{
		saatler = posted_json.mesaj;	
		clearTimeout(saatTimer); 
		saatTimer = setTimeout(saatKontrol, 10);           		
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
			//yazılar boş.
			saatler = null;	
			clearTimeout(saatTimer); 	
		}
		else{
			saatler = null;
			clearTimeout(saatTimer); 
			toastEkle("Saatler","Hata:"+posted_json.hata,"hata");
		}
	}
}

var suankiSaat;
var saatrowArkaPlanRenk= "";
var saatrowYukseklik;
function saatKontrol(){
	if(saatler != null)
	{
		suankiSaat = new Date();
		suankiSaat = suankiSaat.getHours()+":"+suankiSaat.getMinutes()+ ":00"; // saniyelerin doğruluğu için. getSecond yapmıyoruz. 00 standart.
		//console.log(suankiSaat);	
		saatrowYukseklik = (($( "#sag" ).outerHeight() - $( "#saatbaslik" ).outerHeight()) / saatler.length);
		//console.log(saatrowYukseklik);
		html = "<div class='container-fluid'>";
		for(var i=0; i < saatler.length;i++)
		{			
			// 10:00 >= 09:00 && 10:00 < 11:00
			//console.log( suankiSaat + " >= "+ saatler[i].bas_saat + " && "+ suankiSaat +" < "+ saatler[i].bit_saat);
			var saatSplitArr = suankiSaat.split(":");
			var suankiSaatDate = new Date(1996,09,03,saatSplitArr[0], saatSplitArr[1],saatSplitArr[2]);
			saatSplitArr = String(saatler[i].bas_saat).split(":");
			var basSaatDate = new Date(1996,09,03,saatSplitArr[0], saatSplitArr[1],saatSplitArr[2]);
			saatSplitArr = String(saatler[i].bit_saat).split(":");
			var bitSaatDate = new Date(1996,09,03,saatSplitArr[0], saatSplitArr[1],saatSplitArr[2]);
			//suankiSaat >= saatler[i].bas_saat && suankiSaat < saatler[i].bit_saat // doğru çalışmıyor bu yüzden üsteki yöntemimle kesinleştiriyorum.
			if(suankiSaatDate >= basSaatDate && suankiSaatDate < bitSaatDate)
			{			
				saatrowArkaPlanRenk = "#E1472C";
				$( "#saatmesaj" ).html(saatler[i].mesaj);

				//console.log(suankiSaatFrkHsp + " - "+ bitSaatFrkHsp);
				var diff = bitSaatDate.getTime() - suankiSaatDate.getTime();			
				var hours = Math.floor(diff / (1000 * 60 * 60));
				diff -= hours * (1000 * 60 * 60);
				var mins = Math.floor(diff / (1000 * 60));
				diff -= mins * (1000 * 60);
				saatstr = hours + ":"+mins;
				//console.log(saatstr);				
				//console.log("Suanki Sat"+suankiSaat + " - Bit.S:"+ saatler[i].bit_saat);
				$( "#saataralikmesaji" ).html(("Bitişine "+saatstr + ""));
			}
			else{
				saatrowArkaPlanRenk = "#FFF";
				
			}

			html+=""+				
					"<div class='row' style='background-color:"+saatrowArkaPlanRenk+"; height:"+saatrowYukseklik+"px;padding:5px;padding-left:0px;'>"+
						"<div class='col-md-6'>"+saatler[i].mesaj+
						"</div>"+
						"<div class='col-md-3'>"+saatler[i].bas_saat+
						"</div>"+
						"<div class='col-md-3'>"+saatler[i].bit_saat+
						"</div>"+
					"</div>"+				
				"";
		}
		html += "</div>";
		$('#saatler').html(html);				
		saatTimer = setTimeout(saatKontrol, 1000); 
	}

	
}


function mekanSinifOgretmenGetir(){
	var form_data = new FormData();		
	form_data.append('q', "mekanSinifOgretmenGetir");
	form_data.append('gun', suankiGun);	
	post(getUrl('index1'),form_data,"mekanSinifOgretmenGetir");   
}


var mekan = null;
var mekanTimer = null;
function mekanSinifOgretmenGetirPosted(posted_json){
	//console.log(posted_json);
	if(posted_json.sonuc == "yes") 
	{
		mekan = posted_json.mesaj;	
		clearTimeout(mekanTimer); 
		mekanTimer = setTimeout(mekanKontrol, 10);           		
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
			mekan = null;		
			clearTimeout(mekanTimer); 
		}
		else{
			mekan = null;
			clearTimeout(mekanTimer); 
			toastEkle("Mekan","Hata:"+posted_json.hata,"hata");
		}
	}
}

var mekanGosterimRowSayisi = 6;
var mekanGosterimGosterilenSonIndex = -1;
var mekanrowYuksekligi = 0;

var mekanTekrarlamaTimeKontrol = 5000;
var mekanRenkDegis = false;
function mekanKontrol(){
	if(mekan != null){					
		html = "";
		var snakisaat = new Date();		
		snakisaat = snakisaat.getHours()+":"+snakisaat.getMinutes()+ ":00";			
		bulunanGosterileceklerLength = 0;	
		sifirlamaKontrolu = true;		
		//console.log("Basindex:"+mekanGosterimGosterilenSonIndex);
		html ="<div class='container-fluid'>";
		for(var i = (mekanGosterimGosterilenSonIndex+1); i < mekan.length; i++)
		{
			// 0 = oda 1 = bas_saat 2 = bit_saat 3 = sinif 4 = ogretmen
			var saatSplitArr = snakisaat.split(":");
			var suankiSaatDate = new Date(1996,09,03,saatSplitArr[0], saatSplitArr[1],saatSplitArr[2]);
			saatSplitArr = String(mekan[i][1]).split(":");
			var basSaatDate = new Date(1996,09,03,saatSplitArr[0], saatSplitArr[1],saatSplitArr[2]);
			saatSplitArr = String(mekan[i][2]).split(":");
			var bitSaatDate = new Date(1996,09,03,saatSplitArr[0], saatSplitArr[1],saatSplitArr[2]);
			
			
			if(suankiSaatDate >= basSaatDate && suankiSaatDate < bitSaatDate)
			{				
				bulunanGosterileceklerLength++;
				html+=""+					
						"<div class='row mekanrowyukseklik' style='background-color:"+(mekanRenkDegis ? "#d3cedb" : "#efedf2")+"' >"+
							"<div class='col-md-3'><b>"+mekan[i][0]+
							"</b></div>"+
							"<div class='col-md-3'>"+mekan[i][3]+
							"</div>"+
							"<div class='col-md-6'>"+mekan[i][4]+
							"</div>"+
						"</div>"+					
				"";

				mekanRenkDegis = !mekanRenkDegis;

				if(bulunanGosterileceklerLength == mekanGosterimRowSayisi){ // devam edecek. buraya girilmeden bittiyse döngü sıfırlanacak.
					sifirlamaKontrolu = false;
					mekanGosterimGosterilenSonIndex = i;
					//console.log(mekanGosterimGosterilenSonIndex);
					break;
				}
				else{
					//Son bulunan index.
					sifirlamaKontrolu = false;
					mekanGosterimGosterilenSonIndex = i;
				}
			}

			
			 
		}
		html += "</div>"; //container end
		if(mekanGosterimRowSayisi >= bulunanGosterileceklerLength){ // row sayısına eşit veya o sayıdan büyükse o bulunan sayı kadar yükseklik verilecek ör 6>=4
			mekanrowYuksekligi = $( "#alanyerlesimi" ).outerHeight() / bulunanGosterileceklerLength;
		}
		else{
			mekanrowYuksekligi = $( "#alanyerlesimi" ).outerHeight() / mekanGosterimRowSayisi;
		}

		//console.log(bulunanGosterileceklerLength);

		if(sifirlamaKontrolu)
		{
			//console.log("sifirlandi");
			mekanGosterimGosterilenSonIndex = -1;
			mekanTekrarlamaTimeKontrol = 10;			
		}
		else{
			mekanTekrarlamaTimeKontrol = 5000;
		}
			
		
		
		html +="<style type='text/css'>.mekanrowyukseklik{min-height:"+mekanrowYuksekligi+"px;padding:10px;padding-left:0px;}</style>";
		$('#alanyerlesimi').html(html);				
		mekanTimer = setTimeout(mekanKontrol, mekanTekrarlamaTimeKontrol); 
	}
}


function nobetciOgrenciGetir(){
	var form_data = new FormData();		
	form_data.append('q', "nobetciOgrenciGetir");
	form_data.append('tarih', dt.getFullYear()+ "-"+ (dt.getMonth()+1)+"-"+dt.getDate());	
	post(getUrl('index1'),form_data,"nobetciOgrenciGetir");   
}


var nobetciOgrenciler = null;
var nobetciOgrenciTimer = null;
function nobetciOgrenciGetirPosted(posted_json){
	//console.log(posted_json);
	if(posted_json.sonuc == "yes") 
	{
		nobetciOgrenciler = posted_json.mesaj;	
		clearTimeout(nobetciOgrenciTimer); 
		nobetciOgrenciTimer = setTimeout(nobetciOgrencilerKontrol, 10);           		
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
			nobetciOgrenciler = null;		
			clearTimeout(nobetciOgrenciTimer); 
		}
		else{
			nobetciOgrenciler = null;
			clearTimeout(nobetciOgrenciTimer); 
			toastEkle("Nöbetçi Öğrenciler","Hata:"+posted_json.hata,"hata");
		}
	}
}



var nobetciOgrenciIndex = 0;
function nobetciOgrencilerKontrol(){
	if(nobetciOgrenciler != null){				
		nobetciOgrenciRowYukseklik = $( "#nobetciogrenci" ).outerHeight() / 1;
		html=""+
				"<div class='container-fluid'>"+
					"<div class='row' style='min-height:"+nobetciOgrenciRowYukseklik+"; font-size:2.2vh; padding-top:20px;background-color:#d3cedb;' >"+
						"<div class='col-md-8'><b>"+nobetciOgrenciler[nobetciOgrenciIndex].isim+"</b></div>"+						
						"<div class='col-md-4'>"+nobetciOgrenciler[nobetciOgrenciIndex].sinif+"</div>"+
					"</div>"+
				"</div>"+
			"";
		$('#nobetciogrenci').html(html);
		nobetciOgrenciIndex++;
		if(nobetciOgrenciIndex == nobetciOgrenciler.length)
			nobetciOgrenciIndex = 0;
		
		
		nobetciOgrenciTimer = setTimeout(nobetciOgrencilerKontrol, 5000); 
	}
}


function nobetciOgretmenGetir(){
	var form_data = new FormData();		
	form_data.append('q', "nobetciOgretmenGetir");	
	form_data.append('gun', suankiGun);	
	post(getUrl('index1'),form_data,"nobetciOgretmenGetir");   
}


var nobetciOgretmenler = null;
var nobetciOgretmenTimer = null;
function nobetciOgretmenGetirPosted(posted_json){
	console.log(posted_json);
	if(posted_json.sonuc == "yes") 
	{
		nobetciOgretmenler = posted_json.mesaj;	
		clearTimeout(nobetciOgretmenTimer); 
		nobetciOgretmenTimer = setTimeout(nobetciOgretmenKontrol, 10);           		
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
			nobetciOgretmenler = null;		
			clearTimeout(nobetciOgretmenTimer); 
		}
		else{
			nobetciOgretmenler = null;
			clearTimeout(nobetciOgretmenTimer);
			toastEkle("Nöbetçi Öğretmen","Hata:"+posted_json.hata,"hata");
		}
	}
}

var nobetciOgretmenGosterilecekRow = 2;
var nobetciOgretmenGosterilenSonIndex = -1;
var nobetciOgretmenRowYukseligi = 0;

var nobetciOgretmenTekrarlamaTimeKontrol = 5000;
var nobetciOgretmenRenkDegis = false;
function nobetciOgretmenKontrol(){
	if(nobetciOgretmenler != null){			
		
		html = "";		
		bulunanGosterileceklerLength = 0;	
		sifirlamaKontrolu = true;			
		html = "<div class='container-fluid'>";
		for(var i = (nobetciOgretmenGosterilenSonIndex+1); i < nobetciOgretmenler.length; i++)
		{					
			bulunanGosterileceklerLength++;
			html+=""+				
					"<div class='row nobetciogretmenrowYukselik' style='background-color:"+(nobetciOgretmenRenkDegis ? "#d3cedb" : "#efedf2")+";font-size:2.2vh;padding-top:20px;' >"+
						"<div class='col-md-12'><b>"+nobetciOgretmenler[i][0]+"</b></div>"+						
					"</div>"+				
				"";

			nobetciOgretmenRenkDegis = !nobetciOgretmenRenkDegis;

			if(bulunanGosterileceklerLength == nobetciOgretmenGosterilecekRow){ // devam edecek. buraya girilmeden bittiyse döngü sıfırlanacak.
				sifirlamaKontrolu = false;
				nobetciOgretmenGosterilenSonIndex = i;
				//console.log(mekanGosterimGosterilenSonIndex);
				break;
			}
			else{
				//Son bulunan index.
				sifirlamaKontrolu = false;
				nobetciOgretmenGosterilenSonIndex = i;
			}
			
			 
		}
		html+="</div>";
		if(nobetciOgretmenGosterilecekRow >= bulunanGosterileceklerLength){ // row sayısına eşit veya o sayıdan büyükse o bulunan sayı kadar yükseklik verilecek ör 6>=4
			nobetciOgretmenRowYukseligi = $( "#nobetciogretmen" ).outerHeight() / bulunanGosterileceklerLength;
		}
		else{
			nobetciOgretmenRowYukseligi = $( "#nobetciogretmen" ).outerHeight() / nobetciOgretmenGosterilecekRow;
		}		

		if(sifirlamaKontrolu)
		{
			//console.log("sifirlandi");
			nobetciOgretmenGosterilenSonIndex = -1;
			nobetciOgretmenTekrarlamaTimeKontrol = 10;			
		}
		else{
			nobetciOgretmenTekrarlamaTimeKontrol = 5000;
		}
		html +="<style type='text/css'>.nobetciogretmenrowYukselik{min-height:"+nobetciOgretmenRowYukseligi+"px;padding:10px;padding-left:0px;}</style>";
		$('#nobetciogretmen').html(html);				
		nobetciOgretmenTimer = setTimeout(nobetciOgretmenKontrol, nobetciOgretmenTekrarlamaTimeKontrol); 
	}
}