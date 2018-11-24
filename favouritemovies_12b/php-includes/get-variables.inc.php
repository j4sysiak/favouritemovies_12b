<?php

if (isset($_GET['movie_id'])) {
    $movieID = $_GET['movie_id'];
} 

if (isset($_GET['user_id'])) {
    $userID = $_GET['user_id'];
} 

if (isset($_GET['page'])) {
    $page = $_GET['page'];
} else {
    $page = "error";
}

?>