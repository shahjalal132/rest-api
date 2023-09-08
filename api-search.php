<?php

// Headers
header( 'Content-Type: application/json' );
header( 'Access-Control-Allow-Origin: *' );

// Request accept from user by json format
$data   = json_decode( file_get_contents( "php://input" ), true );
$search = $data['search'];

// Collect Search Request from Query Strings
// $search = isset( $search['search'] ) ? $search['search'] : die( "Search Not Found" );

include "config.php";

$sql    = "SELECT * FROM students WHERE name LIKE '%{$search}%'";
$result = mysqli_query( $conn, $sql ) or die( "Query Failed" );

// Condition check if rows exits more then 0
if ( mysqli_num_rows( $result ) > 0 ) {

    $output = mysqli_fetch_all( $result, MYSQLI_ASSOC );
    echo json_encode( $output );

} else {
    echo json_encode( ['message' => 'No result found', 'status' => false] );
}
