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
    console.log('aoeuoae');
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
    if (this.moveCount === 0) {
      if (this.color === 'white') {
        availRows.push(
          ROWS[ROWS.indexOf(this.row) + 1],
          ROWS[ROWS.indexOf(this.row) + 2],
        );
      } else {
        availRows.push(
          ROWS[ROWS.indexOf(this.row) - 1],
          ROWS[ROWS.indexOf(this.row) - 2],
        );
      }
    }

    return [availCols, availRows];
  }

  highlightMoves(availCols, availRows) {
    this.removeHighlight();

    availCols.forEach((col) => {
      document.querySelector(`#${col}${this.row}`).classList.add('highlighted');
    });

    availRows.forEach((row) => {
      document.querySelector(`#${this.col}${row}`).classList.add('highlighted');
    });
  }

  removeHighlight() {
    document
      .querySelectorAll('.highlighted')
      .forEach((el) => el.classList.remove('highlighted'));
  }

  // move() {}
  //
  // attack() {}
}

export default Pawn;
