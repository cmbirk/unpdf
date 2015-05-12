<?php

try {
  $filename = 'out.txt';

  $file = $_FILES['file']['tmp_name'];

  if (file_exists($file)) {
    $ret = exec("./unpdf $file");
    print_r($ret);
    header('Content-Type: text/plain');
    header("Content-Transfer-Encoding: Binary");
    header("Content-disposition: attachment; filename=\"" . $filename . "\"");
    readfile($filename);
  } else {
    throw new Exception("File $file does not exist.  File may exceed max upload size of '" . ini_get("upload_max_filesize") . "'");
  }

} catch (Exception $e) {
  $json = array (
   'messages' => array(
       array('text' => $e->getMessage(), 'severity' => 'error')
    )
  );

  http_response_code(500);

  echo json_encode($json);
}

