
var server_name = "http://localhost/";
var request_path = "admin/php/"
function getUrl(kontrol)
{
	var url = "";
	switch(kontrol)
	{
		case "login":
			url = server_name + request_path +"login.php";
			break;
		case "pano":
			url = server_name + request_path +"pano.php";
			break;
		case "yazilar":
			url = server_name + request_path +"yazilar.php";
			break;
		case "slaytlar":
			url = server_name + request_path +"slaytlar.php";
			break;
		case "index1excel":
			url = server_name + request_path +"index1excel.php";
			break;
		case "index1":
			url = server_name + request_path +"index1.php";
			break;
	}
	return url;
}

