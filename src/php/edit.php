<?php

require_once('connect.php');

function filter($data)
{
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

$id = $_POST['id'];
$name = $_POST['name'];

$nameFilter = filter($name);

if ($table == 'users'){
  $query = "UPDATE `users` SET `name` = '$nameFilter', `password` = '$passwordFilter', `firstName` = '$firstNameFilter', `lastName` = '$lastNameFilter',  `dateBirth` = '$dateBirthFilter', `group` = '$groupFilter'  WHERE `users`.`id` = $id;";
} if ($table == 'groups') {
  $query = "UPDATE `groups` SET `name` = '$nameFilter' WHERE `groups`.`id` = '$id';";
}

$send = mysqli_query($db, $query);

if (mysqli_connect_errno()){
  echo "Error";
  exit;
}

?>
