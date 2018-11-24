// Inserts a new movie-goer into the database

$(document).ready(function(){
    
    $(document).on('focus', '.newdatarow', function() {
        $('.insert').removeClass('hidden');
    });
    
    $(document).on('click', '.insert', function() {
        $this = $(this);
        
        $title = $('input.newdata[name="title"]').val();
        $description = $('input.newdata[name="description"]').val();
        
        if ($title=="") {
            alert("Please enter a movie title");
        return;
        }
        
        $.ajax({
            url: "ajax/add-movie.ajax.php",
            type: "POST",
            data: {
                'title' : $title,
                'description' : $description
            },
            'beforeSend' : function() {
                $this.removeClass('insert').addClass('loader_small');
                $('.delete').removeClass('success').addClass('hidden');
            },
            'success' : function(response) {
                $movieID = response;

                $('input.newdata').val('');
                
                $title = $title.replace(/'/g, "&apos;");
                $description = $description.replace(/'/g, "&apos;");                
                
                $output = "<tr id='movie_" + $movieID + "' class='datarow'>";
                $output += "<td><input class='data' type='text' name='title' value='" + $title + "'></td>";
                $output += "<td><input class='data' type='text' name='description' value='" + $description + "'></td>";
                $output += "<td class='deletecell'><div class='delete hidden'></div></td>";
                $output += "</tr>";
                
                $('.admin_table tr:last').before($output);
             
                
                $('.delete:last').removeClass('loader_class').addClass('success');
                $this.removeClass('loader_small').addClass('insert');
                
                $(document).on('mouseover', '.deletecell', function() {
                   $('.delete', this).removeClass('hidden success');
                });
            }
        });
    
    });

});