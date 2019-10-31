<?php
	header("Access-Control-Allow-Origin: *"); // post için gerekli izin
	header("Access-Control-Allow-Headers: *");	
?>

<div class="ustkapsa">
	<div class="ustsol">
		<div class="balik" style="position: absolute;top:0px;"><img src="images/solbalik.gif" width="15" height="15" /></div>					
		<div class="balik2" style="position: absolute;top:60px;"><img src="images/solbalik.gif" width="18" height="18"/></div>					
		<div class="balik2" style="position: absolute;top:10px;"><img src="images/solbalik.gif" width="18" height="18"/></div>															
		<div class="balik3" style="position: absolute;top:40px;"><img src="images/solbalik.gif" width="25" height="25"/></div>
		<div class="kopekbaligi" style="position: absolute;top:20px;"><img src="images/kopekbaligi.gif" width="100" height="50"/></div>
		<span id="panobaslik"></span>
	</div>

	<div class="ustsag">
		<div class="solYasla">
			<span id="suankiGun"></span>
		</div>

		<div class="sagYasla">
			<span id="suankiZaman"></span>						
		</div>
		
	</div>
</div>

<div class="ortakapsa">
	<div class="sol">
		<div class="baslik">Alan Yerleşimi</div>
		<div id="alanyerlesimi">
		</div>
		<div class="baslik">Nöbetçi Öğrenci</div>
		<div id="nobetciogrenci">
		</div>
		<div class="baslik">Nöbetçi Öğretmen</div>
		<div id="nobetciogretmen">
		</div>
	</div>

	<div class="orta" id="ortaicerik">
		
	</div>

	<div class="sag" id="sag">
		<div class="baslik" id="saatbaslik">
			<center>
				<span id="saatmesaj"></span><br/>
				<span id="saataralikmesaji"></span>
			</center>
			
		</div>
		<div id="saatler">

		</div>
	</div>
</div>


<div class="altkapsa">
	<div class="alt">
		<span class="kayanYazi" id="kayanYazi"></div>
	</div>
</div>