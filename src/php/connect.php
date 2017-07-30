<?php
$server = "localhost";
$user = "root";
$password = "";
$base_name = "user_manager";

$db = mysqli_connect($server, $user, $password, $base_name);

if (mysqli_connect_errno()){
  echo "Error";
  exit;
} else {
  
}

?>