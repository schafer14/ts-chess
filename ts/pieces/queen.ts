'use strict';

import Piece = require('../piece');
import config = require('../config');

class Queen extends Piece {
	protected label:string = 'Q';

	get unicodeChar(): string {
		return this.color === config.Color['1'] ? String.fromCharCode(0x2655) : String.fromCharCode(0x265B);
	}
}

export = Queen;