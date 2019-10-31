
// ############# Index Binding #############
// index ana sayfa olduğu için index.php include edildiğinde aşağıdaki binding bilgileri olmayacak bu yüzden sadece index main de binding yapılıyor.
function indexBinding(){
	var form_data = new FormData();		
	form_data.append('q', "panoBilgileriniGetir");	
	post(getUrl('pano'),form_data,"panoBilgileriniGetir");
}

var secilenTema = "";
function indexBindingPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{
		var data = posted_json.mesaj;		
		secilenTema = data.tema; // bu tema bilgisiyle tema ayarlarını kontrol edebiliriz.
		$('#panobaslik').val(data.pano_adi);
        $('#temasecim').val(data.tema);                
        $('#kadi').val(sessionStorage.getItem("kadi"));
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
			toastEkle("Ana Sayfa","Bilgiler Boş","hata");
		}
		else{
			toastEkle("Ana Sayfa","Hata:"+posted_json.hata,"hata");
		}
	}
}


function yazilariGetir(){
	var form_data = new FormData();		
    form_data.append('q', "yazilariGetir");	
    form_data.append('tema', secilenTema);	
    post(getUrl('yazilar'),form_data,"yazilariGetir");    
}

function yazilariGetirPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{
        var data = posted_json.mesaj;		       
		yazilarHtml = "";
		yazilarHtml += "<div class='row rowBaslik'>"+
		"<div class='col-md-1' style='width:3%'>Sil</div>"+
		"<div class='col-md-11'>Yazılar</div>"+
		"</div>"; 
        for(var i = 0; i < data.length; i++)
        {
            yazilarHtml += "<div class='row rowStili'>"+
                                "<div class='col-md-1' style='width:3%'>"+
                                    "<div onclick='yaziSil("+data[i].yazi_id+")' class='sil'></div>"+
                                "</div>"+                                
                                "<div class='col-md-11'>"+data[i].yazi+"</div>"+
                                
                            "</div>";
        }

        $( "#yazilar" ).html(yazilarHtml);
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
            $( "#yazilar" ).html('');
			//toastEkle("Yazılar","Hiç Yazı Girilmemiş.","bilgi");
		}
		else{
            $( "#yazilar" ).html('');
			toastEkle("Yazılar","Hata:"+posted_json.hata,"hata");
		}
	}
}

function slaytlariGetir(){
	var form_data = new FormData();		
    form_data.append('q', "slaytlariGetir");	
    form_data.append('tema', secilenTema);	
    post(getUrl('slaytlar'),form_data,"slaytlariGetir");    
}

function slaytlariGetirPosted(posted_json){
	if(posted_json.sonuc == "yes") 
	{
        var data = posted_json.mesaj;		       
		html = ""; 
		html += "<div class='row rowBaslik'>"+
		"<div class='col-md-1' style='width:3%'>Sil</div>"+
		"<div class='col-md-8'>Resim/Video/T.V</div>"+
		"<div class='col-md-3'>Bekleme Süresi</div>"+
		"</div>"; 
        for(var i = 0; i < data.length; i++)
        {
            html += "<div class='row rowStili'>"+
						"<div class='col-md-1' style='width:3%'>"+
							"<div onclick='slaytSil("+data[i].slayt_id+")' class='sil'></div>"+
						"</div>"+
						"<div class='col-md-1' style='width:3%'>"+
							"<div onclick='slaytGuncelle("+data[i].slayt_id+", "+i+")' class='tik'></div>"+
						"</div>";
						switch(data[i].tip)
						{
							case "tv":							
								html+="<div class='col-md-7'><iframe src='"+data[i].yol+"&autostart=0&autoplay=false' frameborder='0' width='320' height='240' webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe></div>";
								break;
							case "resim":								
								html+="<div class='col-md-7'><img src='../"+data[i].yol+"' width='320' height='240' /></div>";
								break;
							case "video":
								html+="<div class='col-md-7'><video width='320' height='240' controls ><source src='../"+data[i].yol+"' type='video/mp4'></video></div>"; //autoplay
								break;
						}					
						
						html+="<div class='col-md-3'><input type='number' class='form-control' id='bekSuresi"+i+"' value='"+data[i].beklemesuresi+"' min='0' step='10' placeholder='Saniye'></div>"+
					"</div>";
        }

        $( "#slaytlar" ).html(html);
	}
	else
	{
		if(posted_json.hata == "[bos]") 
		{
            $( "#slaytlar" ).html('');			
		}
		else{
            $( "#slaytlar" ).html('');
			toastEkle("Yazılar","Hata:"+posted_json.hata,"hata");
		}
	}
}



// ############# Temalar Binding #############
function temaAyarlariBinding(){
    if(secilenTema == "Tema 1"){
        //Sadece tema1 ayarları olacak.
        $( "#tema2" ).remove();

        //Tema 1 e ait bilgiler yükleniyor.
		yazilariGetir();
		slaytlariGetir();
    }
    else if(secilenTema == "Tema 2")
    {
        //sadece tema2 ayarları olacak.
        $( "#tema1" ).remove();
		yazilariGetir();
		slaytlariGetir();
    }
}

function temaAyarlariBindingPosted(){
    
}



//Global binding
$( "#kullanicininadi" ).html( "Hoşgeldin, "+sessionStorage.getItem("adi"));

//index açıldığında anasayfaya yönlendirme.
router("pages/index.php", "Ana Sayfa");