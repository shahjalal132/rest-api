<?php

// Headers
header( 'Content-Type: application/json' );
header( 'Access-Control-Allow-Origin: *' );
header( 'Access-Control-Allow-Methods: POST' );
header( 'Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Authorization, X-Requested-With' );

// Request accept from user by json format
$data = json_decode( file_get_contents( "php://input" ), true );
$name = $data['sname'];
$age  = $data['sage'];
$city = $data['scity'];

include "config.php";

$sql = "INSERT INTO students(name, age, city) VALUES ('{$name}', {$age}, '{$city}')";

if ( mysqli_query( $conn, $sql ) ) {
    echo json_encode( ['message' => 'Student Record Inserted', 'status' => true] );
} else {
    echo json_encode( ['message' => 'Student Record not Inserted', 'status' => false] );
}
