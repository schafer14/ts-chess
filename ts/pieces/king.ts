'use strict';

import Piece = require('../piece');
import config = require('../config');

class King extends Piece {
	protected touched: boolean = false;
	protected label:string = 'K';
	
	get unicodeChar():string {
		return this.color === config.Color['1'] ? String.fromCharCode(0x2654) : String.fromCharCode(0x265A);
	}
}

export = King;