
<!-- Toast 22.02.2018 #Author Murat Çakmak -->

<!--Test için include <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script> -->
<div id="toaster">
</div>
<style type="text/css">

	#toaster{
		position: fixed;
		right:10px;
		z-index: 2000;
	}
	

	.toastInfo{
		background-image: url('images/bilgi.png');
		background-repeat: no-repeat;
		background-size: 35px 35px;
		width: 35px;
		height:35px;
	}

	.toastWarning{
		background-image: url('images/dikkat.png');
		background-repeat: no-repeat;
		background-size: 35px 35px;
		width: 35px;
		height:35px;
	}

	.toastHata{
		background-image: url('images/hata.png');
		background-repeat: no-repeat;
		background-size: 35px 35px;
		width: 35px;
		height:35px;
	}

	.toastkapsa{
		width:300px;
		min-height:150px;
		background-color:#0288D1;
		border-radius:2px;
	}

	.toastbaslikKapsa{
		width:100%;
		height:70px;
		border-bottom: 1px solid #BDBDBD;
		margin-top:10px;
	}

	.toastbaslik{
		font-size:2.3vh;
		color:white;
		padding:5px;
		padding-left:10px;
		line-height:70px;
	}
	.toastbilIcon{		
		padding-top:20px;
		padding-right:10px;
	}
	.toastmesaj{
		padding:10px;
		word-break: break-all;	
		color:white;
		font-size:1.7vh;	
	}
	

	.animasyon-fadein-full{
		-webkit-animation: fadeinfull 2s; /* Safari, Chrome and Opera > 12.1 */
		-moz-animation: fadeinfull 2s; /* Firefox < 16 */
		-ms-animation: fadeinfull 2s; /* Internet Explorer */
		-o-animation: fadeinfull 2s; /* Opera < 12.1 */
		animation: fadeinfull 2s;
	}

	.animasyon-fadeout-full{
		-webkit-animation: fadeoutfull 2s; /* Safari, Chrome and Opera > 12.1 */
		-moz-animation: fadeoutfull 2s; /* Firefox < 16 */
		-ms-animation: fadeoutfull 2s; /* Internet Explorer */
		-o-animation: fadeoutfull 2s; /* Opera < 12.1 */
		animation: fadeoutfull 2s;
	}

	.solYasla{
		float:left;
	}

	.sagYasla{
		float:right;
	}

	/* ######### FADE IN ANI ######### */
	
	@keyframes fadeinfull {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	/* Firefox < 16 */
	@-moz-keyframes fadeinfull {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	/* Safari, Chrome and Opera > 12.1 */
	@-webkit-keyframes fadeinfull {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	/* Internet Explorer */
	@-ms-keyframes fadeinfull {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	/* Opera < 12.1 */
	@-o-keyframes fadeinfull {
		from { opacity: 0; }
		to   { opacity: 1; }
	}

	/* ######### FADE OUT ANI ######### */
	@keyframes fadeoutfull {
		from { opacity: 1; }
		to   { opacity: 0; }
	}

	/* Firefox < 16 */
	@-moz-keyframes fadeoutfull {
		from { opacity: 1; }
		to   { opacity: 0; }
	}

	/* Safari, Chrome and Opera > 12.1 */
	@-webkit-keyframes fadeoutfull {
		from { opacity: 1; }
		to   { opacity: 0; }
	}

	/* Internet Explorer */
	@-ms-keyframes fadeoutfull {
		from { opacity: 1; }
		to   { opacity: 0; }
	}

	/* Opera < 12.1 */
	@-o-keyframes fadeoutfull {
		from { top: 1; }
		to   { top: 0; }
	}
</style>

<script type="text/javascript">
	var toastid=-1;
	function toastEkle(baslik,mesaj,tip){
		toastid +=1;
		var toast = 
		"<div id='tos"+toastid+"' class='toastkapsa animasyon-fadein-full' > "+
			"<div class='toastbaslikKapsa'>"+
				"<div class='solYasla'>"+
					"<div class='toastbaslik'>"+baslik+"</div>"+
				"</div>"+
				"<div class='sagYasla'>"+
					"<div class='toastbilIcon'>";
					switch(tip)
					{
						case "bilgi":
							toast+="<div class='toastInfo'></div>";
							break;
						case "dikkat":
							toast+="<div class='toastWarning'></div>";
							break;
						case "hata":
							toast+="<div class='toastHata'></div>";
							break;
					}
		toast+= 	"</div>"+
				"</div>"+						
			"</div>"+
			"<div class='toastmesajKapsa'>"+
				"<div class='toastmesaj'>"+mesaj+"</div>"+
			"</div>"+
		"</div>";

		$( "#toaster" ).append(toast);
		toastSil(toastid);
	}

	//Sayfada Toast Testi için
	/*
	setTimeout(function(){
		toastEkle("Test1","Başarıyla Kaydedildi", "bilgi");
	}, 1000);
	setTimeout(function(){
		toastEkle("Test2","adqweqwq", "dikkat");
	}, 2000);

	setTimeout(function(){
		toastEkle("Test3","adqweqwq", "hata");
	}, 3000);*/

	function toastSil(toast_id){
		setTimeout(function(){
			$('#tos'+toast_id).removeClass('animasyon-fadein-full').addClass('animasyon-fadeout-full');
			setTimeout(function(){					
				$( "#tos"+toast_id ).remove(); // toastın silinmesi.
			}, 1000); //toastın kaybolma süresinin beklenmesi.
		}, 5000); // Toastın ekranda kalma süresi
	}
</script>