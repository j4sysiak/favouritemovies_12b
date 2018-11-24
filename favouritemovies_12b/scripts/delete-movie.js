// Deletes movie-goers from database

$(document).ready(function() {
	
	$(document).on('mouseover mouseout', '.deletecell', function(){
        $('.delete', this).toggleClass('hidden');
    });
	
    $(document).on('click', '.delete', function(){
	    $this = $(this);
		$id = $(this).closest('tr').attr('id').split("_");
        $id = $id[1];
		
		$.ajax({ // Begin delete ajax
			url: "ajax/delete-movie.ajax.php",
			type: "POST",
			data: { // Begin data
				'movie_id': $id
			}, // End data
			'beforeSend': function() {
				$this.removeClass('delete').addClass('loader_small');
			},				
			'success': function(result) {
				$('tr#movie_' + $id).remove();
			},
		}); // End delete ajax			
		
    });
    
}); // End document ready
