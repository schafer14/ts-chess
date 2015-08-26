'use strict';

import Piece = require('../piece');
import config = require('../config');

class Bishop extends Piece {
	protected label:string = 'B';

	get unicodeChar(): string {
		return this.color === config.Color['1'] ? String.fromCharCode(0x2657) : String.fromCharCode(0x265D);
	}
}

export = Bishop;