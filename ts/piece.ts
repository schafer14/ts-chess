'use strict';

import config = require('./config');
import Square = require('./square');

class Piece {
	protected square:Square;
	protected _color:config.Color;

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

	move(square: Square): void {
		this.square = square;
	};

	legalMove(square: Square): (squares: Array<Square>) => boolean {
		return function() {
			return false;
		};
	};

	del(): void {
		delete this;
	};
}

export = Piece;