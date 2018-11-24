// Shows and hides admin menus on mouseover

$(document).ready(function(){
    
    $('.select_users, .users_menu').mouseover(function(){
       $('.users_menu').removeClass('hidden');
       $('.admin_menu').addClass('hidden');
    });
    
    $('.users_menu, .admin_menu').mouseout(function(){
        $(this).addClass('hidden'); 
    });
    
    $('.admin_button, .admin_menu').mouseover(function(){
       $('.admin_menu').removeClass('hidden');
       $('.users_menu').addClass('hidden');
    });
        
});