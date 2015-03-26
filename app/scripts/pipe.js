window.Pipe = (function() {
	'use strict';

	var WIDTH = 10;
	var SPEED = 30;
	var GAPSIZE = 20;
	var MINPIPESIZE = 5;
	var newTopHeight = 0;
	var newBottomHeight = 0;
	var resetCounter = 0;
	var playerPosX = 35;


	var Pipe = function(el, game, type, number) {
		this.el = el;
		this.game = game;
		this.type = type;
		this.number = number;

		if(this.type === "upper") {
			this.INITIAL_POSITION_Y = 0;
		} else {
			this.INITIAL_POSITION_Y = 57.6;
		}
		if(this.number === 1) {
			this.INITIAL_POSITION_X = 102.4;
		} else {
			this.INITIAL_POSITION_X = 153.6;
		}
		this.pos = { x: this.INITIAL_POSITION_X, y: this.INITIAL_POSITION_Y };
	};

	Pipe.prototype.reset = function(soft) {
		this.makeRandomGap();
		if(soft){
			console.log("soft " + this.number);
			this.INITIAL_POSITION_X = 102.4;
		}
		else {
			if(this.number === 2){
				console.log("hard" + this.number);
				console.log("position " + this.INITIAL_POSITION_X);
				this.INITIAL_POSITION_X = 153.6;
			}
		}

		this.pos.x = this.INITIAL_POSITION_X;

		if(this.type === "upper") {
			this.el.css('height', newTopHeight + 'em');
		}
		else {
			this.el.css('height', newBottomHeight + 'em');
			this.pos.y = this.INITIAL_POSITION_Y - newBottomHeight;
		}
		this.newTopHeight = newTopHeight;
	};

	Pipe.prototype.makeRandomGap = function() {
		if(resetCounter === 0) {
			resetCounter++;
			newTopHeight = Math.floor((Math.random() * 100) % 30);
			if(newTopHeight < MINPIPESIZE){
				newTopHeight = MINPIPESIZE;
			}
			newBottomHeight = 57.6 - newTopHeight - GAPSIZE;
		}
		else if(resetCounter === 1) {
			resetCounter = 0;
		}
	}

	Pipe.prototype.onFrame = function(delta) {

		this.pos.x -= delta * SPEED;

		this.checkForReset();
		
		// Update UI
		this.el.css('transform', 'translate(' + this.pos.x + 'em, ' + this.pos.y + 'em)');

		this.checkForCollision();
	};

	Pipe.prototype.checkForReset = function() {
		if (this.pos.x + WIDTH < 0) {
			return this.reset(true);
		}
	};

	Pipe.prototype.checkForCollision = function() {
		var playerPosY = this.game.player.pos.y;
		if(playerPosX >= this.pos.x && playerPosX <= (this.pos.x + WIDTH) && playerPosY <= this.newTopHeight && this.type === "upper"){
			return this.game.gameover();
		}
		playerPosY += 5;
		if(playerPosX >= this.pos.x && playerPosX <= (this.pos.x + WIDTH) && playerPosY >= this.pos.y && this.type === "lower"){
			return this.game.gameover();
		}

	}

	return Pipe;

})();