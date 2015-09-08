'use strict';

import Piece = require('../piece');
import config = require('../config');
import Square = require('../square');

class Rook extends Piece {
	protected touched: boolean = false;
	protected label:string = 'R';

	get unicodeChar(): string {
		return this.color === config.Color['1'] ? String.fromCharCode(0x2656) : String.fromCharCode(0x265C);
	}

	legalMove(square: Square): (squares: Array<Square>) => boolean {
		if (square.col === this.square.col) {
			return function(squares: Array<Square>): boolean {
				var max: number = Math.max(square.row, this.square.row);
				var min: number = Math.min(square.row, this.square.row);
				
				var blockedSquares = squares.filter(function(square) {
					return square.row > min && square.row < max && (square.piece !== null);
				});

				return blockedSquares.length === 0;
			};
		}

		else if (square.row === this.square.row) {
			return function(squares: Array<Square>): boolean {
				var max: number = Math.max(square.col, this.square.col);
				var min: number = Math.min(square.col, this.square.col);
				
				return squares.filter(function(square) {
					return square.col > min && square.col < max && (square.piece !== null);
				}).length === 0;
			};
		}

		else {
			return function(squares: Array<Square>): boolean {
				return false;
			};
		}
	};
}

export = Rook;