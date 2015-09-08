'use strict';

var Square = require('../../../js/square');
var assert = require('chai').assert;

describe('Converting a string repersentation of a square to a number', function() {
	it('Should work for normal cases', function() {
		assert.equal(Square.squareToNumber('a1'), 0);
		assert.equal(Square.squareToNumber('b1'), 1);
		assert.equal(Square.squareToNumber('a2'), 8);
		assert.equal(Square.squareToNumber('c3'), 18);
		assert.equal(Square.squareToNumber('h8'), 63);
	});

	it('Should handle letters out of range', function() {
		assert.throws(Square.squareToNumber.bind(Square, 'i5'), Error, /invalid letter/i);
		assert.throws(Square.squareToNumber.bind(Square, 'z6'), Error, /invalid letter/i);
	});

	it('Should handle numbers out of range', function() {
		assert.throws(Square.squareToNumber.bind(Square, 'a0'), Error, /invalid number/i);
		assert.throws(Square.squareToNumber.bind(Square, 'b9'), Error, /invalid number/i);
	});

	it('Should handle upper case letters', function() {
		assert.equal(Square.squareToNumber('A5'), 32);
		assert.equal(Square.squareToNumber('E3'), 20);
	});

	it('Should handle strings that are more then two characters', function() {
		assert.throws(Square.squareToNumber.bind(Square, 'a94'), Error, /invalid input/i);
		assert.throws(Square.squareToNumber.bind(Square, 'abc4'), Error, /invalid input/i);
		assert.throws(Square.squareToNumber.bind(Square, 'abc454'), Error, /invalid input/i);
	});

	it('Should handle strings that are less then two characters', function() {
		assert.throws(Square.squareToNumber.bind(Square, 'a'), Error, /invalid input/i);
		assert.throws(Square.squareToNumber.bind(Square, '5'), Error, /invalid input/i);
		assert.throws(Square.squareToNumber.bind(Square, ''), Error, /invalid input/i);
	});

	it('Should handle the number coming before the row', function() {
		assert.throws(Square.squareToNumber.bind(Square, '5i'), Error, /invalid input/i);
	});

	it('Should handle two numbers', function() {
		assert.throws(Square.squareToNumber.bind(Square, '56'), Error, /invalid input/i);
	});

	it('Should handle two letters', function() {
		assert.throws(Square.squareToNumber.bind(Square, 'ef'), Error, /invalid input/i);
	});
});