'use strict';

var Square = require('../../../js/square');
var assert = require('chai').assert;

describe('Creating a square', function() {
	var square = new Square('37');

	it('should create a square instance', function() {
		assert.instanceOf(square, Square);
	});

	it('should not accept creating a square without a position', function() {
		assert.throws(Square.bind(Square), Error, /invalid index/i);
	});

	it('should correctly assign the name', function() {
		assert.equal(square.name, 'f5');
	});

	it('should start without a piece', function() {
		assert.isNull(square.piece);
	});
});