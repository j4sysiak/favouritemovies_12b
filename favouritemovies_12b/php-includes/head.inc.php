<!DOCTYPE html>

<html>
    <head>
        <meta charset="UTF-8">
        <link href="css/reset.css" rel="stylesheet">
        <link href="css/style.css" rel="stylesheet">
        
        <!--[if lt IE 9]>
            <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
            <script src="scripts/html5shiv-printshiv.js"></script>
        <![endif]-->

        <script src = "http://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js"></script>
        <script src = "http://ajax.googleapis.com/ajax/libs/jqueryui/1.10.3/jquery-ui.min.js"></script>
                
        <script src="scripts/navigation.js"></script>
        <script src="scripts/jquery.tinysort.min.js"></script>
        
        <?php
        
        if (isset($userID)) { ?>
            <script>var $userID  = "<?php echo $userID; ?>"</script>
            <script src = "scripts/remove-favs.js"></script>
            <script src = "scripts/add-favs.js"></script>
        
            <?php
            if (isset($movieID)) { ?>
                <script src = "scripts/remove-fav-single.js"></script>
                <script src = "scripts/add-fav-single.js"></script>
            <?php }
        
        } 
        
        if ($page=="users") { ?>
            <script src = "scripts/delete-user.js"></script>
            <script src = "scripts/add-user.js"></script>
            <script src = "scripts/update-user.js"></script>
        <?php }
        
        if ($page=="movies") { ?>
            <script src = "scripts/delete-movie.js"></script>
            <script src = "scripts/add-movie.js"></script>
            <script src = "scripts/update-movie.js"></script>
        <?php } ?>
        
        <title>Instant Update Database Project by WebinAction.co.uk</title>        
    </head>
    
