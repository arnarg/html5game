
/**
 * Bootstrap and start the game.
 */
$(function() {
    'use strict';
    var started = false;
    var game = new window.Game($('.GameCanvas'));
    $(window).on('mousedown', function(){
		if(!started){
			game.start();
			started = true;
		}
    });
    
});
