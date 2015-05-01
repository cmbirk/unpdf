<?php

require 'vendor/autoload.php';

$infile = $argv[1];
$tmpfile = 'tmp.pdf';

$unsecure_command = "gs -q -dNOPAUSE -dBATCH -sDEVICE=pdfwrite -sOutputFile=$tmpfile -c .setpdfwrite -f $infile";

exec($unsecure_command);

$parser = new \Smalot\PdfParser\Parser();

$pdf = $parser->parseFile($tmpfile);

unlink($tmpfile);

$pages = $pdf->getPages();

$output = "";

foreach($pages as $num => $page) {
  $text = $page->getText();
  $output .= $text;
}

file_put_contents('out.txt', $output);