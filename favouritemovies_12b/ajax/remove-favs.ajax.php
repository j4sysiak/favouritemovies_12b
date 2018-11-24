<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {

    require_once '../php-includes/connect.inc.php';
    
    $userID = $_POST['user_id'];
    $movieID = $_POST['movie_id'];
    
    $stmt = $db->prepare("DELETE FROM favourites WHERE movie_id = ? && user_id = ?");
    $stmt->bind_param('ii', $movieID, $userID);
    $stmt->execute();
    $stmt->close();

}

?>