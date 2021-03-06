
window.Game = (function() {
	'use strict';

	/**
	 * Main game class.
	 * @param {Element} el jQuery element containing the game.
	 * @constructor
	 */
	var Game = function(el) {
		this.el = el;
		this.player = new window.Player(this.el.find('.Player'), this);
		this.pipe1Upper = new window.Pipe(this.el.find('.Pipe1upper'), this, 'upper', 1);
		this.pipe1Lower = new window.Pipe(this.el.find('.Pipe1lower'), this, 'lower', 1);
		this.pipe2Upper = new window.Pipe(this.el.find('.Pipe2upper'), this, 'upper', 2);
		this.pipe2Lower = new window.Pipe(this.el.find('.Pipe2lower'), this, 'lower', 2);
		this.isPlaying = false;
		this.scoreBoardVisible = false;

		// Cache a bound onFrame since we need it each frame.
		this.onFrame = this.onFrame.bind(this);
	};

	/**
	 * Runs every frame. Calculates a delta and allows each game
	 * entity to update itself.
	 */
	Game.prototype.onFrame = function() {
		// Check if the game loop should stop.
		if (!this.isPlaying) {
			return;
		}

		// Calculate how long since last frame in seconds.
		var now = +new Date() / 1000,
				delta = now - this.lastFrame;
		this.lastFrame = now;

		// Update game entities.
		this.player.onFrame(delta);
		this.pipe1Upper.onFrame(delta);
		this.pipe1Lower.onFrame(delta);
		this.pipe2Upper.onFrame(delta);
		this.pipe2Lower.onFrame(delta);

		// Request next frame.
		window.requestAnimationFrame(this.onFrame);
	};

	/**
	 * Starts a new game.
	 */
	Game.prototype.start = function() {
		var that = this;
		$('#introText').show();
		$(window).on('mousedown', function(){
			if(!that.isPlaying && !that.scoreBoardVisible){
				that.reset();
				$('#introText').hide();
				// Restart the onFrame loop
				that.lastFrame = +new Date() / 1000;
				window.requestAnimationFrame(that.onFrame);
				that.isPlaying = true;
			}
	    });
	    $(window).on('keydown', function(e){
			if(!that.isPlaying && e.keyCode === 32 && !that.scoreBoardVisible){
				console.log('keydown');
				that.reset();
				$('#introText').hide();
				// Restart the onFrame loop
				that.lastFrame = +new Date() / 1000;
				window.requestAnimationFrame(that.onFrame);
				that.isPlaying = true;
			}
	    });
	    return;
	};

	/**
	 * Resets the state of the game so a new game can be started.
	 */
	Game.prototype.reset = function() {
		this.player.reset();
		this.pipe1Upper.reset(false);
		this.pipe1Lower.reset(false);
		this.pipe2Upper.reset(false);
		this.pipe2Lower.reset(false);
		$('.musicAudio')[0].play();
		$('#scoreCounter').show();
		$('.counter').html(0);
		$('.Border')[0].style.webkitAnimationPlayState = 'running';
		$('.background')[0].style.webkitAnimationPlayState = 'running';
		$('.Player')[0].style.webkitAnimationPlayState = 'running';
		$('.Player').css('background-image', 'url(/images/mario-sprite.png)');
		$('.Player').css('background-size', '300%');
	};

	/**
	 * Signals that the game is over.
	 */
	Game.prototype.gameover = function() {
		$('.musicAudio')[0].pause();
		$('.gameOverAudio')[0].play();
		this.isPlaying = false;
		this.scoreBoardVisible = true;
		$('#scoreCounter').hide();
		$('.Border')[0].style.webkitAnimationPlayState = 'paused';
		$('.background')[0].style.webkitAnimationPlayState = 'paused';
		$('.Player')[0].style.webkitAnimationPlayState = 'paused';
		$('.Player').css('background-image', 'url(/images/mario.png)');
		$('.Player').css('background-size', '100%');

		// Should be refactored into a Scoreboard class.
		var that = this;
		var scoreboardEl = this.el.find('.Scoreboard');
		scoreboardEl
			.addClass('is-visible')
			.find('.Scoreboard-restart')
				.one('click', function() {
					scoreboardEl.removeClass('is-visible');
					that.scoreBoardVisible = false;
					that.start();
				});
	};

	$('#muteSong').click(function() {
		$(this).toggleClass('muted');
		$('.musicAudio').prop('muted', !$('.musicAudio').prop('muted'));
	});

	$('#muteSoundEffects').click(function() {
		$(this).toggleClass('muted');
		$('.successAudio').prop('muted', !$('.successAudio').prop('muted'));
		$('.jumpAudio').prop('muted', !$('.jumpAudio').prop('muted'));
		$('.gameOverAudio').prop('muted', !$('.gameOverAudio').prop('muted'));
	});

	/**
	 * Some shared constants.
	 */
	Game.prototype.WORLD_WIDTH = 102.4;
	Game.prototype.WORLD_HEIGHT = 57.6;
	Game.prototype.BORDER_HEIGHT = 2.5;

	return Game;
})();
