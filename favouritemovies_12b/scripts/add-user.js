// Inserts a new movie-goer into the database

$(document).ready(function(){
    
    $(document).on('focus', '.newdatarow', function() {
        $('.insert').removeClass('hidden');
    }); // End focus on newdatarow
    
    $(document).on('click', '.insert', function() {
        $this = $(this);
        
        $firstname = $('input.newdata[name="firstname"]').val();
        $lastname = $('input.newdata[name="lastname"]').val();
        
        if ($firstname=="" && $lastname=="") {
            alert("Please enter at least one name");
            return;
        }
        
        $.ajax({
            url: "ajax/add-user.ajax.php",
            type: "POST",
            data: {
                'firstname' : $firstname,
                'lastname' : $lastname
            }, // End data
            'beforeSend' : function() {
                $this.removeClass('insert').addClass('loader_small');
                $('.delete').removeClass('success').addClass('hidden');
            }, // End beforeSend callback
            'success' : function(response) {
                $id = response;

                $('input.newdata').val('');
                
                $firstname = $firstname.replace(/'/g, "&apos;");
                $lastname = $lastname.replace(/'/g, "&apos;");                
                
                $output = "<tr id='user_" + $id + "' class='datarow'>";
                $output += "<td><input class='data' type='text' name='firstname' value='" + $firstname + "'></td>";
                $output += "<td><input class='data' type='text' name='lastname' value='" + $lastname + "'></td>";
                $output += "<td class='deletecell'><div class='delete hidden'></div></td>";
                $output += "</tr>";
                
                $('.admin_table tr:last').before($output);
                
                $output = "<li id='userlist_" + $id + "'>";
                $output += "<a href='index.php?user_id" + $id + "'>";
                $output += $firstname + " " + $lastname;
                $output += "</a></li>";
                
                $('.users_menu').append($output);
                $('.users_menu li').tsort();                
                
                $('.delete:last').removeClass('loader_class').addClass('success');
                $this.removeClass('loader_small').addClass('insert');
                
                $(document).on('mouseover', '.deletecell', function() {
                   $('.delete', this).removeClass('hidden success');
                }); // End mouseover
                
            } // End success callback
        }); // End AJAX
    }); // End document-on-click
    
}); // End document ready