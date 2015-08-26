'use strict';

import Piece = require('../piece');
import config = require('../config');

class Rook extends Piece {
	protected touched: boolean = false;
	protected label:string = 'R';

	get unicodeChar(): string {
		return this.color === config.Color['1'] ? String.fromCharCode(0x2656) : String.fromCharCode(0x265C);
	}

	move(square: config.Square) {
		return true;
	};
}

export = Rook;