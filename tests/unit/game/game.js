'use strict';

var Game = require('../../../js/game');
var assert = require('chai').assert;

describe('Creating a game', function() {
	var game = new Game();

	it('should create a game instance', function() {
		assert.instanceOf(game, Game);
	});

	describe('#log', function() {
		it('should log the game state without error', function() {
			assert.doesNotThrow(game.log, Game);
		});
	});

	describe('#logToConsole', function() {
		it('should log the game to console without error', function() {
			assert.doesNotThrow(game.logToConsole, Game);
			assert.isUndefined(game.logToConsole());
		});
	});

	describe('#move', function() {
		it('should make valid moves', function() {
			assert.isTrue(game.move(1, 18));
			assert.isFalse(game.move(0, 15));
		});
	});

	describe('#parseMove', function() {
		it('should correctly parse moves', function() {
			assert.sameMembers(Game.parseMove('b1 c3'), [1, 18]);
		});
	});
});