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
			assert.isTrue(game.move([1, 18]));
			assert.isFalse(game.move([0, 15]));
		});

		it('should not take more then two inputs in the array', function() {
			assert.throws(game.move.bind(game, [49, 23, 54]), Error, /invalid input/i);
			assert.throws(game.move.bind(game, [49, 23, 23, 54]), Error, /invalid input/i);
		});

		it('should not allow less then two inputs', function() {
			assert.throws(game.move.bind(game, [54]), Error, /invalid input/i);
		});

		it('should not allow moving outside of the board', function() {
			assert.throws(game.move.bind(game, [12, 64]), Error, /invalid/i);
			assert.throws(game.move.bind(game, [-3, 45]), Error, /invalid/i);
		});

		it('should not allow moving to the same square', function() {
			assert.throws(game.move.bind(game, [34, 34]), Error, /invalid input/i);
		});

		it('should not allow non array inputs', function() {
			assert.throws(game.move.bind(game, '34', '32'), Error, /invalid input/i);
			assert.throws(game.move.bind(game, 12, 43), Error, /invalid input/i);
		});

		it('should have one input an array', function() {
			assert.throws(game.move.bind(game), Error, /invalid/i);
		});

		it('should thrown an error if there is no piece on the square', function() {
			assert.throws(game.move.bind(game, [25, 43]), Error, /no piece/i);
		});
	});

	describe('#parseMove', function() {
		it('should correctly parse moves', function() {
			assert.sameMembers(Game.parseMove('b1 c3'), [1, 18]);
		});

		it('should not accept to many inputs', function() {
			assert.throws(Game.parseMove.bind(Game, 'b1 c3 ae'), Error, /invalid input/i);
		});

		it('should not accept to few inputs', function() {
			assert.throws(Game.parseMove.bind(Game, 'b1'), Error, /invalid input/i);
		});

		it('should only take a string', function() {
			assert.throws(Game.parseMove.bind(Game, ['b1', 'c2']), Error, /parseMove takes a string/i);
		});
	});
});