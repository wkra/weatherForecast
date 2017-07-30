<?php

require_once('connect.php');

$table = $_POST['table'];
$id = $_POST['id'];

$query_delete = "DELETE FROM `$table` WHERE `$table`.`id` = $id";

$wynik = mysqli_query($db, $query_delete);

if (mysqli_connect_errno()){
  echo "Error";
  exit;
}

?>
