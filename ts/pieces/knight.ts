'use strict';

import Piece = require('../piece');
import config = require('../config');

class Knight extends Piece {
	protected label:string = 'N';

	get unicodeChar(): string {
		return this.color === config.Color['1'] ? String.fromCharCode(0x2658) : String.fromCharCode(0x265E);
	}
}

export = Knight;