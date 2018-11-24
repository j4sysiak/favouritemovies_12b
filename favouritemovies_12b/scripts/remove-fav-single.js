$(document).ready(function() { // Removes single movie from favourites list
    
    $requestRunning = false;
    $(document).on('click', '.actions .remove', function() {
        if ($requestRunning) {
            return; // Don't do anything if an AJAX request is running
        }

        $this = $(this);
        $id = $this.attr('id').split("_");
        $id = $id[1];
        
        $.ajax({
            url: "ajax/remove-favs.ajax.php",
            type: "POST",
            data: {
                'user_id' : $userID,
                'movie_id' : $id
            }, // End data
            'beforeSend': function(){
                $requestRunning = true;
				$('.trash').addClass('trash_hover');
				$('.loader_large').removeClass('hidden');
				$('html').not('.loader_large').addClass('dim');
				
            }, // End beforeSend
            'success': function() {
                $requestRunning = false;
				
				$('.trash').removeClass('trash_hover');
				$this.html("<p>Add to favourites</p>").removeClass('remove').addClass('add');
				$('li#fav_' + $id).remove();

                $('.trash, .favs, .non_favs').removeClass('hidden');
                $('.favs_list h2').text("Favourites");
                
                if ($('.favs li').length==0) {
                    $('.trash, .favs').addClass('hidden');
                    $('.favs_list h2').text("You have no favourites");
                    $('.non_favs').removeClass('hidden');
                }
				
				$('.loader_large').addClass('hidden');
				$('html').not('.loader_large').removeClass('dim');
				
            } // End success
        }); // End AJAX
        
    }); // End movie_list click function
}); // End document ready

