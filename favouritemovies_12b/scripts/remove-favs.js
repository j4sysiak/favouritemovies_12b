$(document).ready(function() {  // Removes movie from favourites list
                  
    $('.favs li').draggable({
        helper: 'clone',
        drag: function() {
           $('.trash').addClass('trash_hover');
        } // End drag function 
    }); // End draggable

    $('.trash').droppable({
        accept: '.favs li', 
        drop: function(event, ui) {
            $this = $(ui.draggable);
            $id = $this.attr('id').split("_");
            $id = $id[1];
            $title = $this.text();
            $description = $this.attr('title');
            
            $.ajax({
                url: "ajax/remove-favs.ajax.php",
                type: "POST",
                data: {
                    'user_id' : $userID,
                    'movie_id' : $id
                }, // End data
                'beforeSend': function() {
                    $this.remove();
                    $('.trash').addClass('trash_hover');
                    $('.success').removeClass('success');
                    $('.loader_large').removeClass('hidden');
                    $('html').not('.loader_large').addClass('dim');
                    
                }, // End beforeSend
                'success': function() {
                    $output = "<li id='nonfav_" + $id + "'>";
                    $output += "<figure>";
                    $output += "<a href='index.php?user_id=" + $userID + "&amp;movie_id=" + $id + "'>";
                    $output += "<img class='thumbnail' alt='" + $title + "' src='images-movies/" + $id + "-tn.png' onerror=this.src='images-movies/generic-tn.png'></a>";
                    $output += "<figcaption>";
                    $output += "<h3>";
                    $output += "<a href='index.php?user_id=" + $userID + "&amp;movie_id=" + $id + "'>";
                    $output += $title;
                    $output += "</a></h3>";
                    $output += "<div class='description'>" + $description + "</div>";
                    $output += "<div class='add'></div>";
                    $output += "</figcaption>";
                    $output += "</figure>";
                    $output += "</li>";                    
                   
                    $("ul.non_favs").prepend($output);
                    
                    $this_added = $('li#nonfav_' + $id + ' .add');
                    $this_added.removeClass('favourite').addClass('add success');
                    
                    $('.loader_large').addClass('hidden');
                    $('html').not('.loader_large').removeClass('dim');
                    
                    $('.non_favs li').mouseover(function(){
                        $('.success').removeClass('success');
                    });
                    
                    $('.trash').removeClass('trash_hover');
                    
                    $('p.welcome').text("").removeClass('like_all like_none no_border_bottom').addClass('like_some');
                    $('.trash, .favs, .non_favs').removeClass('hidden');
                    $('.favs_list h2').text("Favourites");
                    
                    if ($('.favs li').length==0) {
                        $('p.welcome').text("").removeClass('like_some').addClass('like_none');
                        $('.trash, .favs').addClass('hidden');
                        $('.favs_list h2').text("You have no favourites");
                        $('.non_favs').removeClass('hidden');
                    }
                    
                    if ($('.non_favs li').length==0) {
                        $('p.welcome').text("").removeClass('like_some').addClass('like_all no_border_bottom');
                        $('.trash, .favs').removeClass('hidden');
                        $('.non_favs').addClass('hidden');
                        $('.favs_list h2').text("Favourites");
                    }
                    
                } // End success
            });  // End AJAX
                          
           
        } // End drop function
    }); // End droppable
    
}); // End document ready

