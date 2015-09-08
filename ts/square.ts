'use strict';

import Piece = require('./piece');

var lettersMap = [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h' ];

class Square {
	private _piece: Piece;
	private _name: string;
	private _col: number;
	private _row: number;
	private id: number;

	constructor(id: number) {
		if (!id) {
			throw new Error('Invalid index');
		}
		
		this.id = id;
		this._col = id % 8;
		this._row = Math.floor(id / 8);
		this._name = lettersMap[this.col] + (this.row + 1);
		this._piece = null;
	};

	get name(): string {
        return this._name;
    }

    get piece(): Piece {
		return this._piece;
    }

    get col(): number {
		return this._col;
    };

    get row(): number {
		return this._row;
    };

    removePiece(): void {
		this._piece = null;
    };

	placePiece(piece:Piece) {
		if (this._piece) {
			this._piece.del();
		}

		this._piece = piece;
	};

	static squareToNumber(squareRepersentation:string):number {
		squareRepersentation = squareRepersentation.toLowerCase();

		if (squareRepersentation.length !== 2) {
			throw new Error('Invalid input: expecting two characters (eg. \'e4\')');
		}

		if (isNaN(parseInt(squareRepersentation[1], 10))) {
			throw new Error('Invalid input: expecting board square as input (eg. \'e4\'');
		}

		if (squareRepersentation[1] === '0' || squareRepersentation[1] === '9') {
			throw new Error('Invalid number: expecting number between 1 and 8');
		}

		if (lettersMap.indexOf(squareRepersentation[0]) === -1) {
			throw new Error('Invalid letter: expecting letter to match [A-Ha-h]');
		}

		return (8 * (parseInt(squareRepersentation[1], 10) - 1)) + lettersMap.indexOf(squareRepersentation[0]);
	};
};

export = Square;