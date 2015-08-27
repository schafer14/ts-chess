'use strict';

import Piece = require('./piece');

var lettersMap = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ];

class Square {
	private _piece: Piece;
	private _name: string;
	private col: number;
	private row: number;
	private id: number;

	constructor(id: number) {
		this.id = id;
		this.col = id % 8;
		this.row = Math.floor(id / 8);
		this._name = lettersMap[this.col] + (this.row + 1);
		this._piece = null;
	};

	get name(): string {
        return this._name;
    }

    get piece(): Piece {
		return this._piece;
    }

    removePiece(): void {
		this._piece = null;
    };

	placePiece(piece:Piece) {
		if (this._piece) {
			this._piece.del();
		}

		this._piece = piece;
	};
};

export = Square;