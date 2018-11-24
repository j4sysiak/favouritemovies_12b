<?php

$dbConnect = array(
    'server' => 'localhost',
    'user' => 'root',
    'pass' => '',
    'name' => 'movies'
);

$db = new mysqli(
    $dbConnect['server'],
    $dbConnect['user'],
    $dbConnect['pass'],
    $dbConnect['name']
);

if ($db->connect_errno>0) {
    echo "Database connection error" . $db->connect_error;
    exit;
}

?>