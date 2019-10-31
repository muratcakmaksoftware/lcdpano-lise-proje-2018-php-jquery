<?php
	header("Access-Control-Allow-Origin: *"); // post için gerekli izin
	header("Access-Control-Allow-Headers: *");
?>

<div class="row">
    <div class="col-md-12">
        <h3 style="font-weight:bold;">Genel Ayarlar</h3>
    </div>
    <div class="col-md-12">
        <hr class="hr"/>
    </div>  
    <div class="col-md-12">
        <div class="form-group">
            <label>Pano Başlığı</label>
            <input type="text" class="form-control" placeholder="Pano Başlığı" name="panobaslik" id="panobaslik" placeholder="Pano Başlığı">
        </div>
        <div class="form-group">
            <label>Tema</label>
            <select name="temasecim" id="temasecim" placeholder="Tema Seçin" class="form-control">
                <option value="Tema 1" >Tema 1</option>
                <option value="Tema 2" >Tema 2</option>
            </select>
            
        </div>
    </div>
    
    <div class="col-md-12">        
        <button style="width:100px;font-weight:bold;" type="button" onclick="panoKaydet()" class="btn btn-info">Kaydet</button>
    </div>

    <div class="col-md-12">
        <h3 style="font-weight:bold;">Kullanıcı Ayarları</h3>
    </div>
    <div class="col-md-12">
        <hr class="hr"/>
    </div>    
    <div class="col-md-12">
        <div class="form-group">
            <label>Kullanıcı Adı</label>
            <input type="text"  id="kadi" class="form-control" placeholder="Kullanıcı Adı" placeholder="Pano Başlığı">
        </div>        
    </div>

    <div class="col-md-12" >
        <div class="form-group">
            <label>Şu anki Şifreniz</label>
            <input type="password" class="form-control" placeholder="Şu anki Şifreniz" id="eskisifre" placeholder="Pano Başlığı">
        </div>        
    </div>

    <div class="col-md-12" >
        <div class="form-group">
            <label>Yeni Şifre</label>
            <input type="password" class="form-control" placeholder="Yeni Şifre" id="yenisifre" placeholder="Pano Başlığı">
        </div>        
    </div>

    <div class="col-md-12">
        <div class="form-group">
            <label>Yeni Şifre Tekrarı</label>
            <input type="password" class="form-control" placeholder="Yeni Şifre Tekrarı" id="yenisifretekrari" placeholder="Pano Başlığı">
        </div>        
    </div>

    <div class="col-md-12">        
        <button style="width:100px;font-weight:bold;" type="button" onclick="kulBilgileriKaydet()" class="btn btn-info">Kaydet</button>
    </div>

    <div class="col-md-12">
        <hr class="hr"/>
    </div>

    <div class="col-md-12">
        <div class="sagYasla">
            <button style="width:100px;font-weight:bold;" type="button" onclick="panoYayinla()" class="btn btn-success">Yayınla</button>
        </div>
    </div>
</div>