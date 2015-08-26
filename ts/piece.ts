'use strict';

import config = require('./config');
import Square = require('./square');

class Piece {
	private square:Square;
	private _color:config.Color;

	constructor(color: config.Color, square: Square) {
		this._color = color;
		this.square = square;
	};

	get color(): config.Color {
		return this._color;
	};

	get unicodeChar(): string {
		return '';
	};

	move(square: config.Square) {
		return false;
	};

	del() {
		delete this;
	};
}

export = Piece;