// Updates existing movie-goers

$(document).ready(function(){
	
	$(document).on('focus', '.data', function() {
		$this = $(this);
		$id = $this.closest('tr').attr('id').split("_");
		$id = $id[1];
		$thisName = $this.val();
		$thisField = $this.attr('name');
		
		if ($thisField=="firstname") {
			$otherField = "lastname";
		}
		if ($thisField=="lastname") {
			$otherField = "firstname";
		}
		
		$otherName = $('tr#user_' + $id + ' .data[name="' + $otherField + '"]').val();
		
		$this.on('focusout', function(){
			$newName = $this.val();
			if ($newName!=$thisName) {
				
				$.ajax({
					url: "ajax/update-user.ajax.php",
					type: "POST",
					data: {
						'this_field' : $thisField,
						'id' : $id,
						'new_name' : $newName
					}, // End data
					'beforeSend' : function() {
						$('.success').removeClass('success').addClass('delete hidden');
						$('#user_' + $id + ' .deletecell div').removeClass('delete hidden').addClass('loader_small');
					}, // End beforeSend
					
					'success' : function() {
						$('.loader_small').removeClass('loader_small').addClass('success');
						
						$(document).on('mouseover', '.deletecell', function() {
							$('.success', this).addClass('delete').removeClass('hidden success');
						}); // End mouseover deletecell

					} // End success
					
				}); // End AJAX
				
				$output = "<li id='userlist_" + $id + "'>";
				$output += "<a href='index.php?user_id" + $id + "'>";
				
				if ($thisField=="firstname") {
					$output += $newName + " " + $otherName;
				}
				if ($thisField=="lastname") {
					$output += $otherName + " " + $newName;
				}
				
				$output += "</a></li>";
				
				$('li#userlist_' + $id).remove();
				$('.users_menu').append($output);
				$('.users_menu li').tsort();  						
				
			} // End if names-not-same condition
		}); // End focusout
	}); // End focus

}); // End document ready