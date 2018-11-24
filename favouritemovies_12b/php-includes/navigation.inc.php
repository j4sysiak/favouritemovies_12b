<?php
$testUsers = testUsers();

switch($testUsers) {
    
    case "no_id":
        $usersList = showUsers('all');
        $heading = "<h2><a>Choose a movie-goer</a></h2>";
        $loggedState = "logged_out";
        break;
    
    case "invalid_id":
        $usersList = showUsers('all');
        $heading = "<h2><a>Choose a movie-goer</a></h2>";
        $loggedState = "logged_out";
        break;
    
    case "id_set":
        $usersList = showUsers('others');
        $heading = showUsers('current');
        $loggedState = "logged_in";
        break;

	case "no_data":
		$heading = "<h2><a href='index.php?page=users'>Add movie-goers</a></h2>";
		$usersList = "";
		$loggedState = "logged_out";
		break;
    
}

echo "\t\t<nav class='navigation'>\n";
echo "\t\t\t<div class='select_users'>\n";
echo "\t\t\t\t$heading\n";
echo "\t\t\t</div>\n\n";
    
echo "\t\t\t<div class='profile $loggedState'></div>\n";
echo "\t\t\t<div class='admin_button'></div>\n\n";
    
echo $usersList;
        
echo "\t\t\t<ul class='admin_menu hidden'>\n";
echo "\t\t\t\t<li><a href='index.php?page=users'>Manage users</a></li>\n";
echo "\t\t\t\t<li><a href='index.php?page=movies'>Manage movies</a></li>\n";
echo "\t\t\t</ul>\n";
echo "\t\t</nav>\n\n";

if ($page=="users") {
    include 'admin-users.inc.php';
    include 'footer.inc.php';
    exit;
}

if ($page=="movies") {
    include 'admin-movies.inc.php';
    include 'footer.inc.php';
    exit;
}

if ($testUsers=="no_id") {
    echo "\t\t<div class='message'>\n";
    echo "\t\t\t<h2>Choose one of the movie-goers from the menu on the right</h2>\n";
    echo "\t\t</div>\n\n";
    include 'footer.inc.php';
    exit;
}

if ($testUsers=="invalid_id") {
    echo "\t\t<div class='message alert'>\n";
    echo "\t\t\t<h2>Invalid user ID: Choose one of the movie-goers from the menu on the right</h2>\n";
    echo "\t\t</div>\n\n";
    include 'footer.inc.php';
    exit;
}

if ($testUsers=="no_data") {
    echo "\t\t<div class='message alert'>\n";
    echo "\t\t\t<h2>No movie-goers in database: Add movie-goers below</h2>\n";
    echo "\t\t</div>\n\n";
    include 'admin-users.inc.php';
	include 'footer.inc.php';
    exit;
}


?>