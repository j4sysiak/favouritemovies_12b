// Updates existing movies

$(document).ready(function(){
	
	$(document).on('focus', '.data', function() {
		$this = $(this);
		$id = $this.closest('tr').attr('id').split("_");
		$id = $id[1];
		$thisName = $this.val();
		$thisField = $this.attr('name');
		
		if ($thisField=="title") {
			$otherField = "description";
		}
		if ($thisField=="description") {
			$otherField = "title";
		}
		
		$otherName = $('tr#movie_' + $id + ' .data[name="' + $otherField + '"]').val();
		
		console.log("THIS FIELD "+ $thisField);
		console.log("OTHER FIELD "+ $otherField);
		
		console.log("THIS NAME "+ $thisName);
		console.log("OTHER NAME "+ $otherName);
		
		
		
		$this.on('focusout', function(){
			$newName = $this.val();
			if ($newName!=$thisName) {
				
				$.ajax({
					url: "ajax/update-movie.ajax.php",
					type: "POST",
					data: {
						'this_field' : $thisField,
						'id' : $id,
						'new_name' : $newName
					}, // End data
					'beforeSend' : function() {
						$('.success').removeClass('success').addClass('delete hidden');
						$('#movie_' + $id + ' .deletecell div').removeClass('delete hidden').addClass('loader_small');
					}, // End beforeSend
					
					'success' : function() {
						$('.loader_small').removeClass('loader_small').addClass('success');
						
						$(document).on('mouseover', '.deletecell', function() {
							$('.success', this).addClass('delete').removeClass('hidden success');
						}); // End mouseover deletecell

					} // End success
					
				}); // End AJAX
				
				$output = "<li id='movielist_" + $id + "'>";
				$output += "<a href='index.php?movie_id" + $id + "'>";
				
				if ($thisField=="title") {
					$output += $newName + " " + $otherName;
				}
				if ($thisField=="description") {
					$output += $otherName + " " + $newName;
				}
				
				$output += "</a></li>";
				
				$('li#movielist_' + $id).remove();
				$('.movies_menu').append($output);
				$('.movies_menu li').tsort();  						
				
			} // End if names-not-same condition
		}); // End focusout
	}); // End focus

}); // End document ready