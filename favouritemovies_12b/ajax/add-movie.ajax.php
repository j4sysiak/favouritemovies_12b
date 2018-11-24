<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {

    require_once '../php-includes/connect.inc.php';
    
    $title = $_POST['title'];
    $description = $_POST['description'];
    
    $stmt = $db->prepare("INSERT INTO movies (title, description) VALUES (?, ?)");
    $stmt->bind_param('ss', $title, $description);
    $stmt->execute();
    $stmt->close();
    
    $maxIdSQL = "SELECT MAX(movie_id) AS movie_id FROM movies";
    $maxIdResult = $db->query($maxIdSQL);
    $maxIdNumrows = $maxIdResult->num_rows;
    
    while ($row = $maxIdResult->fetch_object()) {
        $movieID = $row->movie_id;
        $result = $movieID;
    }
    
    echo $result;

}

?>