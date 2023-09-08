<?php

// Headers
header( 'Content-Type: application/json' );
header( 'Access-Control-Allow-Origin: *' );

include "config.php";

$sql    = "SELECT * FROM students";
$result = mysqli_query( $conn, $sql ) or die( "Query Failed" );

// Condition check if rows exits more then 0
if ( mysqli_num_rows( $result ) > 0 ) {

    $output = mysqli_fetch_all( $result, MYSQLI_ASSOC );
    echo json_encode( $output );

} else {
    echo json_encode( ['message' => 'No result found', 'status' => false] );
}
