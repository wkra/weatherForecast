<?php

require_once('connect.php');

function filter($data){
  $data = substr($data, 0, 30);
  $data = trim($data);
  $data = stripslashes($data);
  $data = htmlspecialchars($data);
  return $data;
}

$table = $_POST['table'];

if ($table == 'users'){
  $password = $_POST['password'];
  $firstName = $_POST['firstName'];
  $lastName = $_POST['lastName'];
  $dateBirth = $_POST['dateBirth'];
  $group = $_POST['group'];

  $passwordFilter = filter($password);
  $firstNameFilter = filter($firstName);
  $lastNameFilter = filter($lastName);
  $dateBirthFilter = filter($dateBirth);
  $groupFilter = filter($group);
}

$name = $_POST['name'];


$nameFilter = filter($name);

if ($table == 'users'){
  $query = "INSERT INTO `users` ( `name`, `password`, `firstName`, `lastName`, `dateBirth`, `group`) VALUES ('$nameFilter', '$passwordFilter', '$firstNameFilter', '$lastNameFilter', '$dateBirthFilter', '$groupFilter');";
} if ($table == 'groups') {
  $query = "INSERT INTO `groups` (`name`) VALUES ('$name');";
}


$send = mysqli_query($db, $query);

if (mysqli_connect_errno()){
  echo "Error";
  exit;
}
?>
