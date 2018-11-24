<?php
$favsList = showMovies('favs');
$nonfavsList = showMovies('non_favs');
$testMovies = testMovies();
$testFav = testFav();

$welcome = "Here are some movies you might like. ";
$welcome .= "Click on the heart icon to add them to your favourites list.";	
$favsTitle = "Favourites";
$trashClass = "";
$openTag = "<ul class='non_favs'>";
$welcomeClass = "";

if ($favsList=="") {
	$welcome = "You haven't got any favourite movies yet! ";
	$welcome .= "Mouse over the movies and click on the heart icon to add them to the list on the left.";
	$favsTitle = "You have no favourites";
	$trashClass = "hidden";
}

if ($nonfavsList=="") {
	$welcome = "It looks like you love all the movies! ";
	$welcome .= "Drag them to the trash can to delete them from your favourites.";
	$openTag = "<ul class='non_favs hidden'>";
	$welcomeClass = "no_border_bottom";
}

switch($testMovies) {    
    case "invalid_id":
        echo "\t\t<div class='message alert'>\n";
        echo "\t\t\t<h2>Invalid movie ID: Choose a movie-goer from the menu on the right</h2>\n";
        echo "\t\t</div>\n\n";
        include 'footer.inc.php';
        exit;
		
	case "no_data":
		echo "\t\t<div class='message alert'>\n";
		echo "\t\t\t<h2>No movies in database: Add movies below</h2>\n";
		echo "\t\t</div>\n\n";
		include 'admin-movies.inc.php';
		include 'footer.inc.php';
		exit;
		
    case "no_id":
        $greeting = showUsers('get_name');
        break;   		
        
    case "id_set":
        $singleMovie = showMovies('single');
        break;
}

echo "\t\t<nav class='favs_list'>\n";
echo "\t\t\t<h2>$favsTitle</h2>\n\n";
echo "\t\t\t<ul class='favs'>\n";
echo $favsList;
echo "\t\t\t</ul>\n\n";
echo "\t\t\t<div class='trash $trashClass'></div>\n";
echo "\t\t</nav>\n\n";

switch($testMovies) {
	case "no_id":
		echo "\t\t<section class='movie_list'>\n";
		echo $greeting;
		echo "\t\t\t<p class='welcome $welcomeClass'>$welcome</p>\n\n";
		echo "\t\t\t$openTag\n";
		echo $nonfavsList;
		echo "\t\t\t</ul>\n";
		echo "\t\t</section>\n\n";
		echo "\t\t<div class='loader_large hidden'></div>\n\n";
		break;
	
	case "id_set":
		echo "\t\t<section class='movie_single'>\n";
		echo $singleMovie;
		echo "\t\t</section>\n\n";
		echo "\t\t<div class='loader_large hidden'></div>\n\n";
		break;
}

?>