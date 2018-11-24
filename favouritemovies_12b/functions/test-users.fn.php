<?php

// Called from navigation.inc.php

function testUsers() {
    
    global $db, $userID;
    
    $sql = "SELECT * FROM `movie_goers`";
   	$result = $db->query($sql);
	$num_rows = $result->num_rows;

	if ($num_rows < 1) {
		return ("no_data");
    }
    
    if (!isset($userID)) {
        return("no_id");
    }
    
    if (!is_numeric($userID)) {
        return("invalid_id");
    }
    
    $stmt = $db->prepare("SELECT * FROM movie_goers WHERE user_id = ?");
    $stmt->bind_param('i', $userID);
    $stmt->execute();
    $stmt->store_result();
    $numrows = $stmt->num_rows;
    $stmt->close();
    
    if ($numrows<1) {
        return("invalid_id");
    } else {
        return("id_set");
    }

}


?>