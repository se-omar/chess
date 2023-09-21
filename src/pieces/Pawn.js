import { COLS, ROWS } from '../utils/constants';

class Pawn {
  moveCount = 0;

  clicked = false;

  constructor(col, row, color) {
    this.col = col;
    this.row = row;
    this.color = color;
  }

  render() {
    const pawn = document.createElement('img');
    pawn.classList.add('pieces', 'pawn');
    pawn.setAttribute(
      'src',
      `../src/assets/${this.color}Pieces/${this.color}-pawn.png`,
    );

    document.querySelector(`#${this.col}${this.row}`).appendChild(pawn);

    return pawn;
  }

  getAvailableMoves() {
    const availCols = [];
    const availRows = [];
    const sign = this.color === 'white' ? 1 : -1;
    if (this.moveCount === 0) {
      availRows.push(
        ROWS[ROWS.indexOf(this.row) + 1 * sign],
        ROWS[ROWS.indexOf(this.row) + 2 * sign],
      );
    } else {
      availRows.push(ROWS[ROWS.indexOf(this.row) + 1 * sign]);
    }

    return [availCols, availRows];
  }

  // move() {}
  //
  // attack() {}
}

export default Pawn;
