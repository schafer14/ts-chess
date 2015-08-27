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

	logToConsole(): void {
		var i:number,
			j:number,
			position:number,
			square:Square;

		for (i = 0; i < 8; i ++) {
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
	};

	move(from:number, to:number): void {
		var toSquare: Square = this.squares[to];
		var fromSquare: Square = this.squares[from];
		var piece: Piece = fromSquare.piece;

		piece.move(toSquare);
		fromSquare.removePiece();
		toSquare.placePiece(piece);
	};
}

export = Game;