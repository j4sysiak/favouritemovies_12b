$(document).ready(function() { // Adds movie to favourites list
    
    $(document).on('mouseover mouseout', '.non_favs li', function(){
        $('.add', this).toggleClass('favourite');
    });
    
    $requestRunning = false;
    $(document).on('click', '.non_favs .add', function() {
        if ($requestRunning) {
            return; // Don't do anything if an AJAX request is running
        }

        $this = $(this);
        $this_li = $this.closest('li');
        $id = $this_li.attr('id').split("_");
        $id = $id[1];
        $description = $this.siblings('.description').text();
        $title = $this.siblings('h3').text();

        
        $.ajax({
            url: "ajax/add-favs.ajax.php",
            type: "POST",
            data: {
                'user_id' : $userID,
                'movie_id' : $id
            }, // End data
            'beforeSend': function(){
                $requestRunning = true;
                $this_li.remove();
                $('.highlight').removeClass('highlight');
                $('.loader_large').removeClass('hidden');
                $('html').not('.loader_large').addClass('dim');
                
            }, // End beforeSend
            'success': function() {
                $requestRunning = false;
                
                $title = $title.replace(/'/g, "&apos;");
                $description = $description.replace(/'/g, "&apos;");

                $output = "<li title='" + $description + "' id='fav_" + $id + "'>";
                $output += "<a href='index.php?user_id=" + $userID + "&amp;movie_id=" + $id + "'>";
                $output += $title;
                $output += "</a></li>";                
                
                $('ul.favs').append($output);
                                
                $(".favs li#fav_" + $id).draggable({
                   helper: 'clone'            
                });
                
                $this_added = $('li#fav_' + $id);
                $this_added.addClass('highlight');
                
                $('.loader_large').addClass('hidden');
                $('html').not('.loader_large').removeClass('dim');
                
                $('.favs li').mouseover(function(){
                   $('.highlight').removeClass('highlight');
                });
                
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
        }); // End AJAX
        
    }); // End movie_list click function
}); // End document ready

