window.Pipe = (function() {
	'use strict';

	var WIDTH = 10;
	var SPEED = 30;
	var INITIAL_POSITION_X = 10;
	var INITIAL_POSITION_Y = 20;

	var Pipe = function(el, game, type, number) {
		this.el = el;
		this.game = game;
		console.log("type " + type);
		console.log("number " + number);
		if(type === "upper") {
			this.INITIAL_POSITION_Y = 0;
		} else {
			this.INITIAL_POSITION_Y = 40;
		}
		if(number === 1) {
			this.INITIAL_POSITION_X = 165;
		} else {
			this.INITIAL_POSITION_X = 110;
		}
		this.pos = { x: this.INITIAL_POSITION_X, y: this.INITIAL_POSITION_Y };
	};

	Pipe.prototype.reset = function() {
		this.pos.x = this.INITIAL_POSITION_X;
		this.pos.y = this.INITIAL_POSITION_Y;
	};

	Pipe.prototype.onFrame = function(delta) {

		this.pos.x -= delta * SPEED;

		this.checkForReset();

		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');
	};

	Pipe.prototype.checkForReset = function() {
		if (this.pos.x + WIDTH < 0) {
			return this.reset();
		}
	};

	return Pipe;

})();