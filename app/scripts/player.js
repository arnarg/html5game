window.Player = (function() {
	'use strict';

	var Controls = window.Controls;

	// All these constants are in em's, multiply by 10 pixels
	// for 1024x576px canvas.
	var SPEED = 30;
	var FALLSPEED = 5;
	var FALLCOUNTER = 1;
	var FLYSPEED = 150;
	var FLYCOUNTER = 1;
	var WIDTH = 5;
	var HEIGHT = 5;
	var INITIAL_POSITION_X = 30;
	var INITIAL_POSITION_Y = 25;
	var ROTATION = 0;

	var Player = function(el, game) {
		this.el = el;
		this.game = game;
		this.pos = { x: 30, y: 25 };
	};

	/**
	 * Resets the state of the player for a new game.
	 */
	Player.prototype.reset = function() {
		this.pos.x = INITIAL_POSITION_X;
		this.pos.y = INITIAL_POSITION_Y;
	};

	Player.prototype.onFrame = function(delta) {
		if (Controls.keys.mouse) {
			$('.jumpAudio')[0].play();
			if (FLYCOUNTER === 10) {
				Controls.keys.mouse = false;
				FLYCOUNTER = 1;
				FALLCOUNTER = 1;
			}
			else {
				this.pos.y -= delta * (FLYSPEED / FLYCOUNTER);
				++FLYCOUNTER;
			}
			ROTATION = -10;
		}
		else {
			if (FALLCOUNTER === 20) {
				this.pos.y += delta * (FALLSPEED * FALLCOUNTER);
			}
			else {
				this.pos.y += delta * (FALLSPEED * FALLCOUNTER);
				++FALLCOUNTER;
			}
			ROTATION += 2;
		}

		this.checkCollisionWithBounds();

		// Update UI
		this.el.css('transform', 'translateZ(0) translate(' + this.pos.x + 'em, ' + this.pos.y + 'em) rotate(' + ROTATION + 'deg)');
	};

	Player.prototype.checkCollisionWithBounds = function() {
		if (this.pos.x < 0 ||
			this.pos.x + WIDTH > this.game.WORLD_WIDTH ||
			this.pos.y < 0 ||
			this.pos.y + HEIGHT > this.game.WORLD_HEIGHT - this.game.BORDER_HEIGHT) {
			return this.game.gameover();
		}
	};

	return Player;

})();
