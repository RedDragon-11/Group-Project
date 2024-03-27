<?php
    header("Allow: GET, POST, HEAD");


    $email = $_POST['email']; // Add semicolon
    $fname = $_POST['fname']; // Add semicolon
    $lname = $_POST['lname']; // Add semicolon
    $psw = $_POST['psw']; // Add semicolon
    
    //Database connection
    $conn = new mysqli('localhost','root','','test'); // Add semicolon
    if($conn->connect_error){
        die('Connection Failed : '.$conn->connection_error);
    }else{
        $stmt = $conn->prepare("insert into registration(fname, lname, email, psw)
        values(?, ?, ?, ?)");
        $stmt->bind_param("ssss", $fname, $lname, $email, $psw);
        $stmt->execute();
        echo "registration successful...";
        $stmt->close();
        $conn->close();
    }
    



?>