
<?php 
	include "../../php/ayarlar.php";
	include_once('PHPExcel.php');
	include 'PHPExcel/IOFactory.php';

	$inputFileName = './test.xlsx';

	//  Read your Excel workbook
	try {
		$inputFileType = PHPExcel_IOFactory::identify($inputFileName);
		$objReader = PHPExcel_IOFactory::createReader($inputFileType);
		$objPHPExcel = $objReader->load($inputFileName);
	} catch(Exception $e) {
		die('Error loading file "'.pathinfo($inputFileName,PATHINFO_BASENAME).'": '.$e->getMessage());
	}

	//  Get worksheet dimensions
	$sheet = $objPHPExcel->getSheet(0); 
	$highestRow = $sheet->getHighestRow(); 
	$highestColumn = $sheet->getHighestColumn();

	//  Loop through each row of the worksheet in turn
	for ($row = 2; $row <= $highestRow; $row++){ // 2 satırdan başlanılmasının nedeni başlık sütunlarından
		
		//  Read a row of data into an array
		$rowData = $sheet->rangeToArray('A' . $row . ':' . $highestColumn . $row,
										NULL,
										TRUE,
										FALSE);
        										
		//  Insert row data array into your database of choice here
		var_dump($rowData);		
	}
?>
