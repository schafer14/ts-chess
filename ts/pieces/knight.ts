'use strict';

import Piece = require('../piece');
import config = require('../config');
import Square = require('../square');

class Knight extends Piece {
	protected label:string = 'N';

	get unicodeChar(): string {
		return this.color === config.Color['1'] ? String.fromCharCode(0x2658) : String.fromCharCode(0x265E);
	};


	legalMove(square: Square): (squares: Array<Square>) => boolean {
		if (
			(Math.abs(this.square.col - square.col) === 2 && Math.abs(this.square.row - square.row) === 1) ||
			(Math.abs(this.square.col - square.col) === 1 && Math.abs(this.square.row - square.row) === 2)
		) {
			return function(squares: Array<Square>): boolean {
				return true;
			};	
		} else {
			return function(squares: Array<Square>): boolean {
				return false;
			}
		}

	};
};

export = Knight;