'use strict';

var Piece = require('../../../js/piece');
var Square = require('../../../js/square');
var assert = require('chai').assert;

describe('Creating a piece', function() {
	var square = new Square('37');
	var piece = new Piece(0, square);

	it('should create a piece instance', function() {
		assert.instanceOf(piece, Piece);
	});

	it('should correctly assign the color', function() {
		assert.equal(piece.color, 0);
	});

	it('should start without a square', function() {
		assert.equal(piece.square, square);
	});

	it('should not initialize a unicode char', function() {
		assert.equal(piece.unicodeChar, '');
	});

	describe('#move', function() {
		it('should move the piece onto a new square', function() {
			piece.move(square);

			assert.equal(piece.square, square);
		});

		it('should update the square to reflect it has a piece', function() {
			piece.move(square);

			assert.equal(square.piece, piece);
		});
	});
	describe('#legalMove', function() {
		it('should return an function that returns false', function() {
			assert.isFalse(piece.legalMove(square)());
		});
	});
});