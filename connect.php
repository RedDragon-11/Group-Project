<?php

$email = filter_input(INPUT_POST, 'email');
$firstName = filter_input(INPUT_POST, 'firstName');
$lastName = filter_input(INPUT_POST, 'lastName');
$password = filter_input(INPUT_POST, 'password');



$host = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "salidata";

//create connection

$conn = new mysqli ($host, $dbusername, $dbpassword, $dbname);

if (mysqli_connect_error()){
    die('Connect Error ('. mysqli_connect_errorno() .') '
    . mysqli_connect_error());
}
else{
    $sql = "INSERT INTO storedinfo(email, firstName, lastName, password)
    values ('$email', '$firstName', '$lastName', '$password')";
    if ($conn->query($sql)){
        echo "New record is inserted successfully";
    }
    else{
        echo "Error: ". $sql ."<br>". $conn->error;
    }
    $conn->close();
}

?>