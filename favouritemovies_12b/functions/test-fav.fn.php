<?php

function testFav() {
    global $db, $userID, $movieID;
    
    $stmt = $db->prepare("SELECT * FROM favourites WHERE user_id = ? AND movie_id = ?");
    $stmt->bind_param('ii', $userID, $movieID);
    $stmt->execute();
    $stmt->store_result();
    $numrows = $stmt->num_rows;
    $stmt->close();
    
    if ($numrows<1) {
        $output = "Add to favourites";
    } else {
        $output = "Remove from favourites";
    }
    return($output);    
}

?>