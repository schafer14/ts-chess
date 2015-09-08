'use strict';

/// <reference path="./node.d.ts" />

import config = require('./config');

import King = require('./pieces/king');
import Queen = require('./pieces/queen');
import Rook = require('./pieces/rook');
import Bishop = require('./pieces/bishop');
import Knight = require('./pieces/knight');
import Pawn = require('./pieces/pawn');

import Piece = require('./piece');
import Square = require('./square');

// config in static class
var init:string = '' 
	+ '03000110022004300540025001600370'
	+ '00010011002100310041005100610071'
	
	+ '10061016102610361046105610661076'
	+ '13071117122714371547125711671377';

var pieceType = [ Pawn, Knight, Bishop, Rook, Queen, King ];

interface BoardParam {
	rules?: string;
}

class Game {
	private pieces:Array<Piece>;
	private turn:config.Color;
	private history:Array<config.Move>
	private squares:Array<Square>

	constructor(state?: string, parameters?: BoardParam) {
		this.pieces = [];
		this.turn = config.Color.White;
		this.history = [];
		this.squares = [];

		var self = this;
		var i = 0;

		for (i; i < 64; i ++) {
			var square:Square = new Square(i);
			self.squares.push(square);
		}

		state = state || init;

		var pieceStrings:Array<string> = state.match(/.{4}/g);

		pieceStrings.forEach(function(pieceString:string) {
			var parts:Array<string> = pieceString.split('');
			var color:config.Color = config.Color[parts[0]];
			var place = 8 * parseInt(parts[3], 10) + parseInt(parts[2], 10);

			var piece:Piece = new pieceType[parts[1]](color, self.squares[place]);

			self.squares[place].placePiece(piece);
			self.pieces.push(piece);
		});
	};

	log(): void {
		// Determine where the dest is;
		this.logToConsole();
	};

	private logToConsole(): void {
		var i:number,
			j:number,
			position:number,
			square:Square;

		for (i = 0; i < 8; i ++) {
			process.stdout.write( (8 - i) + ' | ');

			for (j = 0; j < 8; j ++) {
				position = ((7 - i) * 8 + j);
				square = this.squares[position];

				// process.stdout.write(('0' + position.toString()).slice(-2) + ' ');
				if (square.piece && square.piece.unicodeChar) {
					process.stdout.write(square.piece.unicodeChar + ' ');
				} else {
					process.stdout.write('  ');
				}
			}
			process.stdout.write('\n');
		}

		process.stdout.write('    ----------------\n    a b c d e f g h \n');
	};

	move(squares: Array<number>): boolean {
		if (!(squares instanceof Array)) {
			throw new Error('Invalid input: move takes an array of two numbers');
		}

		if (squares.length !== 2) {
			throw new Error('Invalid input: move takes an array of two numbers');
		}

		if (squares[0] > 63 || squares[0] < 0 || squares[1] > 63 || squares[1] < 0) {
			throw new Error('Invalid input: square out of bounds');
		}

		if (squares[0] === squares[1]) {
			throw new Error('Invalid input: cannot move to the same square');
		}
		
		var toSquare: Square = this.squares[squares[1]];
		var fromSquare: Square = this.squares[squares[0]];

		if (!fromSquare.piece) {
			throw new Error('Invalid input: no piece found on square');
		}

		var piece: Piece = fromSquare.piece;


		// Not the same square
		// All squares exist
		// Not moving onto own piece
		// Check it is the correct players turn

		var isLegalMove: (squares: Array<Square>) => boolean = piece.legalMove(toSquare);
		
		if (isLegalMove(this.squares)) {
			piece.move(toSquare);
			fromSquare.removePiece();
			toSquare.placePiece(piece);

			// Increment turn
			// Set en passent

			return true;
		} else {
			return false;
		}

	};

	static parseMove(str:string): Array<Number> {
		if (typeof str !== 'string') {
			throw new Error('parseMove takes a string');
		}

		var delimiters:	RegExp = /[,\s\t\nx]/;

		var parts: Array<string> = str.split(delimiters);

		if (parts.length !== 2) {
			throw new Error('invalid input: parseMove takes exactly two squares');
		}
		
		return [Square.squareToNumber(parts[0]), Square.squareToNumber(parts[1])];
	};
}

export = Game;