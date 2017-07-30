<?php

header('Content-type: application/json');

require_once('connect.php');

$table = $_GET['table'];

$query = "SELECT * FROM $table";

$response = mysqli_query($db, $query);

$data = array();

while ($row = mysqli_fetch_row($response))
{
  $data[] = $row;
}

if (mysqli_connect_errno()){
  echo "Error";
  exit;
}

echo json_encode($data);

?>
