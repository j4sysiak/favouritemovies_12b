$(document).ready(function() { // Adds single movie to favourites list
    
    $requestRunning = false;
    $(document).on('click', '.actions .add', function() {
        if ($requestRunning) {
            return; // Don't do anything if an AJAX request is running
        }

        $this = $(this);
        $id = $this.attr('id').split("_");
        $id = $id[1];
        $description = $('p.description').text();
        $title = $('h3.title').text();

        
        $.ajax({
            url: "ajax/add-favs.ajax.php",
            type: "POST",
            data: {
                'user_id' : $userID,
                'movie_id' : $id
            }, // End data
            'beforeSend': function(){
                $requestRunning = true;
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
				
				
				$this.html("<p>Remove from favourites</p>").removeClass('add').addClass('remove');
				
                $('.trash, .favs, .non_favs').removeClass('hidden');
                $('.favs_list h2').text("Favourites");
                
                if ($('.favs li').length==0) {
                    $('.trash, .favs').addClass('hidden');
                    $('.favs_list h2').text("You have no favourites");
                    $('.non_favs').removeClass('hidden');
                }
                
                if ($('.non_favs li').length==0) {
                    $('.trash, .favs').removeClass('hidden');
                    $('.non_favs').addClass('hidden');
                    $('.favs_list h2').text("Favourites");
                }				
				
            } // End success
        }); // End AJAX
        
    }); // End movie_list click function
}); // End document ready

