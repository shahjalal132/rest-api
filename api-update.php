<?php

// Headers
header( 'Content-Type: application/json' );
header( 'Access-Control-Allow-Origin: *' );
header( 'Access-Control-Allow-Methods: PUT' );
header( 'Access-Control-Allow-Headers: Access-Control-Allow-Headers, Access-Control-Allow-Methods, Content-Type, Authorization, X-Requested-With' );

// Request accept from user by json format
$data = json_decode( file_get_contents( "php://input" ), true );

$id   = $data['sid'];
$name = $data['sname'];
$age  = $data['sage'];
$city = $data['scity'];

include "config.php";

$sql = "UPDATE students SET name = '{$name}', age = {$age}, city = '{$city}' WHERE id = {$id}";

if ( mysqli_query( $conn, $sql ) ) {
    echo json_encode( ['message' => 'Student Record Updated', 'status' => true] );
} else {
    echo json_encode( ['message' => 'Student Record not Updated', 'status' => false] );
}
