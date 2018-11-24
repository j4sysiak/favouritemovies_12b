<?php

if (isset($_SERVER['HTTP_X_REQUESTED_WITH'])
    && ($_SERVER['HTTP_X_REQUESTED_WITH']=='XMLHttpRequest')) {

    require_once '../php-includes/connect.inc.php';
    
    $firstname = $_POST['firstname'];
    $lastname = $_POST['lastname'];
    
    $stmt = $db->prepare("INSERT INTO movie_goers (firstname, lastname) VALUES (?, ?)");
    $stmt->bind_param('ss', $firstname, $lastname);
    $stmt->execute();
    $stmt->close();
    
    $maxIdSQL = "SELECT MAX(user_id) AS user_id FROM movie_goers";
    $maxIdResult = $db->query($maxIdSQL);
    $maxIdNumrows = $maxIdResult->num_rows;
    
    while ($row = $maxIdResult->fetch_object()) {
        $userID = $row->user_id;
        $result = $userID;
    }
    
    echo $result;

}

?>