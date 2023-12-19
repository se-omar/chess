import { COLS, ROWS } from '../utils/constants';

class Knight {
  moveCount = 0;

  clicked = false;

  name = 'knight';

  constructor(position, color) {
    this.position = position;
    this.color = color;
  }

  render() {
    const knight = document.createElement('img');
    knight.classList.add('pieces', this.color, 'knight');
    knight.setAttribute(
      'src',
      `../src/assets/${this.color}Pieces/${this.color}-knight.png`,
    );

    document.querySelector(`#${this.position}`).appendChild(knight);

    return knight;
  }

  pushSquares(mainDir, side1, side2, dir) {
    const attackSquares = [];
    const moveSquares = [];
    [side1, side2].forEach((s) => {
      if (s === undefined) {
        return;
      }
      const sq = dir === 'row' ? s + mainDir : mainDir + s;
      const sqEl = document.querySelector(`#${sq}`);
      if (sqEl?.firstElementChild) {
        if (!sqEl.firstElementChild.classList.contains(this.color)) {
          attackSquares.push(sq);
        }
        return;
      }
      moveSquares.push(sq);
    });

    return [moveSquares, attackSquares];
  }

  getDirectionMovesAttacks(sign, direction) {
    if (direction === 'row') {
      const row = ROWS[ROWS.indexOf(this.position[1]) + 2 * sign];
      const leftCol = COLS[COLS.indexOf(this.position[0]) + 1];
      const rightCol = COLS[COLS.indexOf(this.position[0]) - 1];

      if (row === undefined) {
        return [[], []];
      }

      return this.pushSquares(row, leftCol, rightCol, direction);
    }

    if (direction === 'col') {
      const col = COLS[COLS.indexOf(this.position[0]) + 2 * sign];
      const leftRow = ROWS[ROWS.indexOf(this.position[1]) + 1];
      const rightRow = ROWS[ROWS.indexOf(this.position[1]) - 1];

      if (col === undefined) {
        return [[], []];
      }

      return this.pushSquares(col, leftRow, rightRow, direction);
    }
    return [];
  }

  getPossibleAttacks() {
    return [];
  }

  getMovesAndAttacks() {
    const [moveUpRow, attackUpRow] = this.getDirectionMovesAttacks(1, 'row');
    const [moveDownRow, attackDownRow] = this.getDirectionMovesAttacks(
      -1,
      'row',
    );
    const [moveUpCol, attackUpCol] = this.getDirectionMovesAttacks(1, 'col');
    const [moveDownCol, attackDownCol] = this.getDirectionMovesAttacks(
      -1,
      'col',
    );
    const availPositions = [];
    const availAttacks = [];

    availPositions.push(
      ...moveUpRow,
      ...moveDownRow,
      ...moveUpCol,
      ...moveDownCol,
    );

    availAttacks.push(
      ...attackUpRow,
      ...attackDownRow,
      ...attackUpCol,
      ...attackDownCol,
    );

    return [availPositions, availAttacks];
  }
}

export default Knight;
