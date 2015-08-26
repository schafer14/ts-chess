'use strict';

import Piece = require('../piece');
import config = require('../config');

class Pawn extends Piece {
	protected touched: boolean = false;
	protected enPassent = false;
	protected label:string = 'P';

	get unicodeChar(): string {
		return this.color === config.Color['1'] ? String.fromCharCode(0x2659) : String.fromCharCode(0x265F);
	}
}

export = Pawn;