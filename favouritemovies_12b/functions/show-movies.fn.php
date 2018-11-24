<?php

// Called in main.inc.php

function showMovies($data) {
    global $db, $userID, $movieID, $testFav;
    
    switch($data) {
        
        case "favs":
            $stmt = $db->prepare("SELECT * FROM movies
                WHERE `movie_id` IN (
                    SELECT `movie_id` FROM `favourites`
                        WHERE `favourites`.`user_id` = ?
                )
            ORDER BY `title`");
            $stmt->bind_param('i', $userID);
            break;
        
        case "non_favs":
            $stmt = $db->prepare("SELECT * FROM movies
                WHERE `movie_id` NOT IN (
                    SELECT `movie_id` FROM `favourites`
                        WHERE `favourites`.`user_id` = ?
                )
            ORDER BY `title`");
            $stmt->bind_param('i', $userID);
            break;
        
        case "single":
            $stmt = $db->prepare("SELECT * FROM movies WHERE movie_id = ?");
            $stmt->bind_param('i', $movieID);
            break;
        
        case "admin":
            $stmt = $db->prepare("SELECT * FROM movies");
            break;
        
    }
    
    $stmt->bind_result($id, $title, $description);
    $stmt->execute();
    
    $output = "";
    
    while ($stmt->fetch()) {
        $title = htmlentities($title, ENT_QUOTES, "UTF-8");
        $description = htmlentities($description, ENT_QUOTES, "UTF-8");
        
        switch($data) {
            case "favs":
                $output .= "\t\t\t\t<li title='$description' id='fav_$id'>";
                $output .= "<a href='index.php?user_id=$userID&amp;movie_id=$id'>$title</a>";
                $output .= "</li>\n";
                break;
            
            case "non_favs":
                if (file_exists("images-movies/$id-tn.png")) {
                    $image = "images-movies/$id-tn.png";
                } else {
                    $image = "images-movies/generic-tn.png";
                }
                $output .= "\t\t\t\t<li id='nonfav_$id'>\n";
                $output .= "\t\t\t\t\t<figure>\n";
                $output .= "\t\t\t\t\t\t<a href='index.php?user_id=$userID&amp;movie_id=$id'>";
                $output .= "<img class='thumbnail' alt='$title' src='$image'></a>\n";
                $output .= "\t\t\t\t\t\t<figcaption>\n";
                $output .= "\t\t\t\t\t\t\t<h3>";
                $output .= "<a href='index.php?user_id=$userID&amp;movie_id=$id'>$title</a>";
                $output .= "</h3>\n";
                $output .= "\t\t\t\t\t\t\t<div class='description'>$description</div>\n";
                $output .= "\t\t\t\t\t\t\t<div class='add'></div>\n";
                $output .= "\t\t\t\t\t\t</figcaption>\n";
                $output .= "\t\t\t\t\t</figure>\n";
                $output .= "\t\t\t\t</li>\n";
                break;
            
            case "single":
                if (file_exists("images-movies/$id.png")) {
                    $image = "images-movies/$id.png";
                } else {
                    $image = "images-movies/generic.png";
                }
                
                if ($testFav=="Add to favourites") {
                    $action = "add";
                }
                if ($testFav=="Remove from favourites") {
                    $action = "remove";
                }
                
                $output .= "\t\t\t<img class='movie_player' alt='$title' src='$image'>\n";
                $output .= "\t\t\t<h3 class='title'>$title</h3>\n";
                $output .= "\t\t\t<div class='actions'>\n";
                $output .= "\t\t\t\t<div id='single_$id' class='add_remove $action'>\n";
                $output .= "\t\t\t\t\t<p>$testFav</p>\n";
                $output .= "\t\t\t\t</div>\n";
                $output .= "\t\t\t</div>\n";
                $output .= "\t\t\t<p class='description'>$description</p>\n";
                break;
            
            case "admin":
                $output .= "\t\t\t\t\t<tr id='movie_$id' class='datarow'>\n";
                $output .= "\t\t\t\t\t\t<td><input class='data' type='text' name='title' value='$title'></td>\n";
                $output .= "\t\t\t\t\t\t<td><input class='data description' type='text' name='description' value='$description'></td>\n";
                $output .= "\t\t\t\t\t\t<td class='deletecell'><div class='delete hidden'></div></td>\n";
                $output .= "\t\t\t\t\t</tr>\n";
                break;
                
        }
    }
    
    $stmt->close();
    return($output);
}

?> 