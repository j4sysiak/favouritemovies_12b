<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {

    require_once '../php-includes/connect.inc.php';
    
    $movieID = $_POST['movie_id'];
    
    $stmt = $db->prepare("DELETE FROM movies WHERE movie_id = ?");
    $stmt->bind_param('i', $movieID);
    $stmt->execute();
    $stmt->close();
    
    $stmt = $db->prepare("DELETE FROM favourites WHERE movie_id = ?");
    $stmt->bind_param('i', $movieID);
    $stmt->execute();
    $stmt->close();

}

?>