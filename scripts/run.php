<?php

require 'vendor/autoload.php';

//Set the filenames
$infile = $argv[1];
$tmpfile = 'tmp.pdf';

//Get the script settings
$settings = json_decode(file_get_contents(realpath(__DIR__ . '/../settings.json')));

//Remove any password protection from the PDF
//Save as temp file
$unsecure_command = "gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=$tmpfile -c .setpdfwrite -f $infile";
exec($unsecure_command);

//Parse the PDF
$parser = new \Smalot\PdfParser\Parser();
$pdf = $parser->parseFile($tmpfile);

//Remove the temp file
unlink($tmpfile);

//Separate the PDF into pages
$pages = $pdf->getPages();

//Concatenate the page text
$output = "";

foreach($pages as $num => $page) {
  $text = $page->getText();
  
  //Replace lines that only contain numbers
  //Attempting to remove pesky line numbers
  $text = preg_replace('/^\d+\s*$/m', '', $text);

  //Replace header text
  //Value pulled from settings.json
  if(isset($settings->header)){
    $text = str_replace($settings->header, '', $text);  
  }

  $output .= $text;
}

//Save the output text
file_put_contents('out.txt', $output);