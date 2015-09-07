'use strict';

export enum Color { White, Black };
export interface Square { col: number, row: number };
export interface Move { from: Square, to: Square };

