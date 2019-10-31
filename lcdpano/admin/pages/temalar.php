<?php
	header("Access-Control-Allow-Origin: *"); // post için gerekli izin
	header("Access-Control-Allow-Headers: *");
?>

<div id="tema1">

    <div class="row" >
        <div class="col-md-12">
            <div class="sagYasla"><h3>Tema 1 Ayarları</h3></div>
        </div>            
    </div> 

    <hr class="hr"/>

    <div class="row" >
        <div class="col-md-12">
            <div class="baslikYazisi">Yazılar</div>
        </div>            
    
    </div>  
    
    <hr class="hr"/> 

    <div id="yazilar">

    </div>
    <div class="row" style="margin-top:10px;">
        
        
        <div class="col-md-1" style="width:3%;">
            <div onclick="yaziEkle()" class="tik"></div>
        </div>
        
        <div class="col-md-11">
            <input type="text" class="form-control" id="yaziekle" placeholder="Yazı Ekle">
        </div>
        
    </div>
    <div style="clear:both;"></div>    
    <hr class="hr"/>

    <div class="row" >
        <div class="col-md-12">
            <div class="baslikYazisi">Slaytlar</div>
        </div>            
    
    </div>  
    
    <hr class="hr"/> 

    <div id="slaytlar">

    </div>


    
    <label id="dosyakontrol" for="secilenDosya" style="width:100%;cursor:pointer;margin-top:10px;">            
        <div style="width:100%;border:3px dashed white;">
            <div style="width:100px;margin-left:auto;margin-right:auto;">        
                <i class="material-icons" style="font-size:100px;">backup</i>
                <input type="file" style="display:none;" onchange="dosyaSecildi()" class="form-control-file" id="secilenDosya">                                          
            </div>
            <div style="text-align:center;" id="dosyaAdi">Seçilen Dosya</div>
        </div>
    </label>    
    
    

    <div class="row" style="margin-top:10px;">
        <div class="col-md-1" style="width:3%;">
            <div onclick="slaytEkle()" class="tik"></div>
        </div>
        <div class="col-md-8">
            <input type="text" class="form-control" onkeyup="tvurlChange()" id="tvurl" placeholder="Tv Url"/>
        </div>        
        <div class="col-md-3">
            <input type="number" class="form-control" id="beklemesuresi" min="0" step="10" placeholder="Saniye">
        </div>

    </div>

    <hr class="hr"/>
    <div class="row" >
        <div class="col-md-11">
            <div class="baslikYazisi">Nöbetçi Öğrenci</div>
        </div>       
        <div class="col-md-1">
            <div class="sagYasla">
                 <div onclick="nobetciOgrenciYukle()" class="file btn btn-md btn-primary">
                    Yükle                    
                </div>
            </div>
        </div>    
    </div>  

   <label for="secNobetciOgrenciFile" style="width:100%;cursor:pointer;margin-top:10px;">            
        <div style="width:100%;border:3px dashed white;">
            <div style="width:100px;margin-left:auto;margin-right:auto;">        
                <i class="material-icons" style="font-size:100px;">backup</i>
                <input type="file" style="display:none;" onchange="excelKontrol('nobetciogrenci')" class="form-control-file" id="secNobetciOgrenciFile">                                          
            </div>
            <div style="text-align:center;" id="secNobetciSecilenDosya">Seçilen Dosya</div>
        </div>
    </label>   

    <hr class="hr"/>
    <div class="row" >
        <div class="col-md-11">
            <div class="baslikYazisi">Mekan Sınıf Öğretmen</div>
        </div>       
        <div class="col-md-1">
            <div class="sagYasla">
                 <div onclick="mekanSinifOgretmenYukle()" class="file btn btn-md btn-primary">
                    Yükle                    
                </div>
            </div>
        </div>    
    </div>  

   <label for="secMekanSinifOgretmenFile" style="width:100%;cursor:pointer;margin-top:10px;">            
        <div style="width:100%;border:3px dashed white;">
            <div style="width:100px;margin-left:auto;margin-right:auto;">        
                <i class="material-icons" style="font-size:100px;">backup</i>
                <input type="file" style="display:none;" onchange="excelKontrol('mekansinifogretmen')" class="form-control-file" id="secMekanSinifOgretmenFile">                                          
            </div>
            <div style="text-align:center;" id="secMekanSinifOgretmenSecilenDosya">Seçilen Dosya</div>
        </div>
    </label>

    <hr class="hr"/>
    <div class="row" >
        <div class="col-md-11">
            <div class="baslikYazisi">Saatler</div>
        </div>       
        <div class="col-md-1">
            <div class="sagYasla">
                 <div onclick="saatYukle()" class="file btn btn-md btn-primary">
                    Yükle                    
                </div>
            </div>
        </div>    
    </div>  

   <label for="secSaatFile" style="width:100%;cursor:pointer;margin-top:10px;">            
        <div style="width:100%;border:3px dashed white;">
            <div style="width:100px;margin-left:auto;margin-right:auto;">        
                <i class="material-icons" style="font-size:100px;">backup</i>
                <input type="file" style="display:none;" onchange="excelKontrol('saat')" class="form-control-file" id="secSaatFile">                                          
            </div>
            <div style="text-align:center;" id="secSaatSecilenFile">Seçilen Dosya</div>
        </div>
    </label> 
    
    <hr class="hr"/>
    <div class="row" >
        <div class="col-md-11">
            <div class="baslikYazisi">Nöbetçi Öğretmenler</div>
        </div>       
        <div class="col-md-1">
            <div class="sagYasla">
                 <div onclick="nobetOgretmenYukle()" class="file btn btn-md btn-primary">
                    Yükle                    
                </div>
            </div>
        </div>    
    </div>  

   <label for="secNobetOgretmenFile" style="width:100%;cursor:pointer;margin-top:10px;">            
        <div style="width:100%;border:3px dashed white;">
            <div style="width:100px;margin-left:auto;margin-right:auto;">        
                <i class="material-icons" style="font-size:100px;">backup</i>
                <input type="file" style="display:none;" onchange="excelKontrol('nobetogretmen')" class="form-control-file" id="secNobetOgretmenFile">                                          
            </div>
            <div style="text-align:center;" id="secNobetOgretmenSecilenFile">Seçilen Dosya</div>
        </div>
    </label>  

</div>
         
<div id="tema2">
<div class="row" >
        <div class="col-md-12">
            <div class="sagYasla"><h3>Tema 2 Ayarları</h3></div>
        </div>            
    </div> 

    <hr class="hr"/>

    <div class="row" >
        <div class="col-md-12">
            <div class="baslikYazisi">Yazılar</div>
        </div>            
    
    </div>  
    
    <hr class="hr"/> 

    <div id="yazilar">

    </div>
    <div class="row" style="margin-top:10px;">
        
        
        <div class="col-md-1" style="width:3%;">
            <div onclick="yaziEkle()" class="tik"></div>
        </div>
        
        <div class="col-md-11">
            <input type="text" class="form-control" id="yaziekle" placeholder="Yazı Ekle">
        </div>
        
    </div>
    <div style="clear:both;"></div>    
    <hr class="hr"/>

    <div id="slaytlar">

    </div>



    <label id="dosyakontrol" for="secilenDosya" style="width:100%;cursor:pointer;margin-top:10px;">            
        <div style="width:100%;border:3px dashed white;">
            <div style="width:100px;margin-left:auto;margin-right:auto;">        
                <i class="material-icons" style="font-size:100px;">backup</i>
                <input type="file" style="display:none;" onchange="dosyaSecildi()" class="form-control-file" id="secilenDosya">                                          
            </div>
            <div style="text-align:center;" id="dosyaAdi">Seçilen Dosya</div>
        </div>
    </label>    



    <div class="row" style="margin-top:10px;">
        <div class="col-md-1" style="width:3%;">
            <div onclick="slaytEkle()" class="tik"></div>
        </div>
        <div class="col-md-8">
            <input type="text" class="form-control" onkeyup="tvurlChange()" id="tvurl"  placeholder="Tv Url"/>
        </div>        
        <div class="col-md-3">
               <input type="number" class="form-control" id="beklemesuresi" min="0" step="10" placeholder="Saniye">
        </div>

    </div>

</div>