'use strict';

var Square = require('../../../js/square');
var King = require('../../../js/pieces/king');
var assert = require('chai').assert;

var square = new Square('37');
var piece = new King(0);

describe('Square', function() {
	describe('#placePiece', function() {
		it('should assign the piece on the square to the piece', function() {
			square.placePiece(piece);
			assert.equal(square.piece, piece);
		});
	});

	describe('#removePiece', function() {
		it('should remove the piece from the square', function() {
			square.removePiece();
			assert.isNull(square.piece);
		});
	});
});
